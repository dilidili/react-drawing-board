import React, { useRef, useEffect, useState, MouseEvent, CSSProperties, useImperativeHandle, forwardRef, WheelEventHandler, useReducer, Reducer, MouseEventHandler, ReactNode, RefObject } from 'react';
import Tool, { ToolOption, Position, MAX_SCALE, MIN_SCALE, } from './enums/Tool';
import { mapClientToCanvas } from './utils';
import { onStrokeMouseDown, onStrokeMouseMove, onStrokeMouseUp, drawStroke, Stroke, useStrokeDropdown, moveStoke } from './StrokeTool';
import { onShapeMouseDown, onShapeMouseMove, onShapeMouseUp, Shape, drawRectangle, useShapeDropdown } from './ShapeTool';
import { onImageComplete, Image, drawImage } from './ImageTool';
import { onTextMouseDown, onTextComplete, drawText, Text, useTextDropdown, font } from './TextTool';
import { onSelectMouseDown, onSelectMouseMove, onSelectMouseUp, onSelectMouseDoubleClick, SELECT_PADDING } from './SelectTool';
import { Icon } from 'antd';
import { v4 } from 'uuid';
import sketchStrokeCursor from './images/sketch_stroke_cursor.png';
import { useZoomGesture } from './gesture';
import Operation from 'antd/lib/transfer/operation';
import styles from './SketchPad.less';

export interface SketchPadProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
  currentToolOption: ToolOption;
  userId: string;
  scale: number;
  onScaleChange: (scale: number) => void;
}

export type SketchPadRef = {
  selectImage: (image: string) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  save: () => void;
};

export type Remove = {
  operationId: string,
}

export type Operation = (Stroke | Shape | Text | Image | Update | Remove) & {
  id: string;
  userId: string;
  timestamp: number;
  pos: Position;
  tool: Tool;
};

export type Update = {
  operationId: string,
  data: Partial<((Stroke | Shape | Text | Image) & {
    pos: Position,
  })>,
};

const DPR = window.devicePixelRatio || 1;

const SELECT_BOX_PADDING = 3;

const stopPropagation: MouseEventHandler = (e) => e.stopPropagation();

export type OperationListState = {
  queue: Operation[],
  reduced: Operation[],
}

const initialOperationState: OperationListState = {
  queue: [],
  reduced: [],
};

const reduceOperations = (operations: Operation[]): Operation[] => {
  const undoHistory: Operation[] = [];

  operations = operations
    .sort((a, b) => a.timestamp - b.timestamp)
    .reduce((r: Operation[], v) => {
      switch (v.tool) {
        case Tool.Undo:
          if (r.length) {
            undoHistory.push(r.pop() as Operation);
          }
          break;
        case Tool.Redo:
          if (undoHistory.length) {
            r.push(undoHistory.pop() as Operation);
          }
          break;
        default:
          undoHistory.splice(0);
          r.push(v);
          break;
      }

      return r;
    }, []);

  let clearIndex: number = -1;
  while ((clearIndex = operations.findIndex(v => v.tool === Tool.Clear)) > 0) {
    operations = operations.slice(clearIndex);
  }

  operations.forEach((v, k) => {
    if (v.tool === Tool.Update) {
      const update = v as Update;
      const targetIndex = operations.findIndex(w => w && w.id === update.operationId);

      if (~targetIndex) {
        const target = operations[targetIndex];
        operations[targetIndex] = { ...operations[targetIndex], ...update.data };

        // move other properties related to pos
        if (update.data.pos) {
          switch (target.tool) {
            case Tool.Stroke:
              operations[targetIndex] = { ...operations[targetIndex], ...{ points: moveStoke(target as Stroke, target.pos, update.data.pos) } };
              break;
            case Tool.Shape: {
              const newOperation: any = ({ ...operations[targetIndex] });
              newOperation.start = {
                x: newOperation.pos.x,
                y: newOperation.pos.y,
              };
              newOperation.end = {
                x: newOperation.pos.x + newOperation.pos.w,
                y: newOperation.pos.y + newOperation.pos.h,
              };
              operations[targetIndex] = { ...newOperation };
              break;
            }
            default:
              break;
          }
        }
      }
    }
  })

  const removeIds = operations.filter(v => v.tool === Tool.Remove).map(v => (v as Remove).operationId);
  operations = operations.filter(v => v.tool !== Tool.Update && removeIds.indexOf(v.id) < 0); // keep Remove operation to keep undoable

  return operations;
}

const operationListReducer: Reducer<OperationListState, any> = (state, action) => {
  switch (action.type) {
    case 'add': {
      let operation = action.payload.operation as Operation;
      const newQueue = state.queue.concat([operation]);

      return {
        queue: newQueue,
        reduced: reduceOperations(newQueue),
      };
    }
    case 'replaceLast': {
      let operation = action.payload.operation as Operation;
      const newQueue = state.queue.slice(0, -1).concat([operation]);

      return {
        queue: newQueue,
        reduced: reduceOperations(newQueue),
      }
    }
    default:
      return state;
  }
}

enum ResizeDirection {
  TopLeft = 'TopLeft',
  TopCenter = 'TopCenter',
  MiddleRight = 'MiddleRight',
  MiddleLeft = 'MiddleLest',
  BottomRight = 'BottomRight',
  BottomCenter = 'BottomCenter',
  BottomLeft = 'BottomLeft',
};

let isResizing: null | ResizeDirection = null;
let startResizePoint: [number, number] = [0, 0];
let startResizePos: Position | null = null;
const useResizeHandler = (
  selectedOperation: Operation | null,
  viewMatrix: number[],
  scale: number,
  items: Operation[],
  operationListDispatch: React.Dispatch<any>,
  setSelectedOperation: (operation: Operation) => void,
  handleCompleteOperation: (tool?: Tool, data?: Stroke | Shape | Text | Image | Update | Remove, pos?: Position) => void,
  refCanvas: RefObject<HTMLCanvasElement>,
): {
  onMouseMove: MouseEventHandler,
  onMouseUp: MouseEventHandler,
  resizer: ReactNode,
} => {
  if (selectedOperation && (selectedOperation.tool === Tool.Shape || selectedOperation.tool === Tool.Image)) {
    const [a, b, c, d, e, f] = viewMatrix;
    const pos = {
      x: selectedOperation.pos.x - SELECT_BOX_PADDING,
      y: selectedOperation.pos.y - SELECT_BOX_PADDING,
      w: selectedOperation.pos.w + 2 * SELECT_BOX_PADDING,
      h: selectedOperation.pos.h + 2 * SELECT_BOX_PADDING,
    };

    const tl = [a * pos.x + c * pos.y + e, b * pos.x + d * pos.y + f];
    const br = [a * (pos.x + pos.w) + c * (pos.y + pos.h) + e, b * (pos.x + pos.w) + d * (pos.y + pos.h) + f];
    const w = br[0] - tl[0], h = br[1] - tl[1];

    const onMouseDown = (direction: ResizeDirection) => (e: MouseEvent) => {
      e.stopPropagation();

      if (refCanvas.current) {
        isResizing = direction;
        startResizePoint = mapClientToCanvas(e, refCanvas.current, viewMatrix);
        startResizePos = { ...selectedOperation.pos };
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (selectedOperation && isResizing && refCanvas.current && startResizePos) {
        let pos = mapClientToCanvas(e, refCanvas.current, viewMatrix);

        const diff = {
          x: pos[0] - startResizePoint[0],
          y: pos[1] - startResizePoint[1],
        };

        const updatePos = {
          ...startResizePos,
        };

        if (isResizing === ResizeDirection.TopLeft) {
          diff.x = Math.min(diff.x, updatePos.w);
          diff.y = Math.min(diff.y, updatePos.h);
          updatePos.x += diff.x;
          updatePos.y += diff.y;
          updatePos.w -= diff.x;
          updatePos.h -= diff.y;
        } else if (isResizing === ResizeDirection.TopCenter) {
          diff.y = Math.min(diff.y, updatePos.h);
          updatePos.y += diff.y;
          updatePos.h -= diff.y;
        } else if (isResizing === ResizeDirection.MiddleRight) {
          diff.x = Math.max(diff.x, -updatePos.w);
          updatePos.w += diff.x;
        } else if (isResizing === ResizeDirection.BottomRight) {
          diff.x = Math.max(diff.x, -updatePos.w);
          diff.y = Math.max(diff.y, -updatePos.h);
          updatePos.w += diff.x;
          updatePos.h += diff.y;
        } else if (isResizing === ResizeDirection.BottomCenter) {
          diff.y = Math.max(diff.y, -updatePos.h);
          updatePos.h += diff.y;
        } else if (isResizing === ResizeDirection.BottomLeft) {
          diff.y = Math.max(diff.y, -updatePos.h);
          diff.x = Math.min(diff.x, updatePos.w);
          updatePos.x += diff.x;
          updatePos.w -= diff.x;
          updatePos.h += diff.y;
        } else if (isResizing === ResizeDirection.MiddleLeft) {
          diff.x = Math.min(diff.x, updatePos.w);
          updatePos.x += diff.x;
          updatePos.w -= diff.x;
        }

        const lastOperation = items[items.length - 1];
        if (lastOperation && lastOperation.tool === Tool.Update && (lastOperation as Update).operationId === selectedOperation.id && (lastOperation as Update).data.pos) {
          const update = lastOperation as Update;
          if (update.data.pos) {
            update.data.pos = {
              ...updatePos,
            };
  
            operationListDispatch({
              type: 'replaceLast',
              payload: {
                operation: update,
              },
            });
          }
        } else {
          handleCompleteOperation(Tool.Update, {
            operationId: selectedOperation.id,
            data: {
              pos: { ...updatePos },
            },
          });
        }

        setSelectedOperation({...selectedOperation, pos: { ...updatePos }});
      }
    }

    const onMouseUp = () => {
      isResizing = null;
    }

    return {
      onMouseMove,
      onMouseUp,
      resizer: (
        <>
          <div key={ResizeDirection.TopLeft} onMouseDown={onMouseDown(ResizeDirection.TopLeft)} className={styles.resizer} style={{ left: tl[0] + 'px', top: tl[1] + 'px' }} />
          <div key={ResizeDirection.TopCenter} onMouseDown={onMouseDown(ResizeDirection.TopCenter)} className={styles.resizer} style={{ left: tl[0] + w / 2 + 'px', top: tl[1] + 'px' }} />
          {/* <div key='tr' className={styles.resizer} style={{ left: tl[0] + w + 'px', top: tl[1] + 'px' }} /> */}
          <div key={ResizeDirection.MiddleRight} onMouseDown={onMouseDown(ResizeDirection.MiddleRight)} className={styles.resizer} style={{ left: tl[0] + w + 'px', top: tl[1] + h / 2 + 'px' }} />
          <div key={ResizeDirection.BottomRight} onMouseDown={onMouseDown(ResizeDirection.BottomRight)} className={styles.resizer} style={{ left: br[0] + 'px', top: br[1] + 'px' }} />
          <div key={ResizeDirection.BottomCenter} onMouseDown={onMouseDown(ResizeDirection.BottomCenter)} className={styles.resizer} style={{ left: br[0] - w / 2 + 'px', top: br[1] + 'px' }} />
          <div key={ResizeDirection.BottomLeft} onMouseDown={onMouseDown(ResizeDirection.BottomLeft)} className={styles.resizer} style={{ left: br[0] - w + 'px', top: br[1] + 'px' }} />
          <div key={ResizeDirection.MiddleLeft} onMouseDown={onMouseDown(ResizeDirection.MiddleLeft)} className={styles.resizer} style={{ left: tl[0] + 'px', top: tl[1] + h / 2 + 'px' }} />
        </>
      )
    }
  } else return {
    onMouseMove: () => {},
    onMouseUp: () => {},
    resizer: null,
  };
}

const SketchPad: React.FC<SketchPadProps> = (props, ref) => {
  const { currentTool, setCurrentTool, userId, currentToolOption, onScaleChange, scale } = props;
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refContext = useRef<CanvasRenderingContext2D | null>(null);
  const refInput = useRef<HTMLDivElement>(null);

  // a  c  e
  // b  d  f
  // 0  0  1
  const [viewMatrix, setViewMatrix] = useState([1, 0, 0, 1, 0, 0]);

  const [hoverOperationId, setHoverOperationId] = useState<string | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [operationListState, operationListDispatch] = useReducer<typeof operationListReducer>(operationListReducer, initialOperationState);

  const saveGlobalTransform = () => {
    if (!refContext.current) return;

    const context = refContext.current;

    context.save();
    context.scale(DPR, DPR);
    const [a, b, c, d, e, f] = viewMatrix;
    context.transform(a, b, c, d, e, f);
  }

  const restoreGlobalTransform = () => {
    if (!refContext.current) return;
    const context = refContext.current;

    context.restore();
  }

  const renderOperations = (operations: Operation[]) => {
    if (!refContext.current) return;
    const context = refContext.current;

    // clear canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    saveGlobalTransform();
    operations.forEach((operation) => {
      const hover = (!selectedOperation || selectedOperation.id !== operation.id) && operation.id === hoverOperationId;

      switch (operation.tool) {
        case Tool.Clear:
          restoreGlobalTransform();
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          saveGlobalTransform();
          break;
        case Tool.Stroke:
          drawStroke(operation as Stroke, context, hover);
          break
        case Tool.Shape:
          drawRectangle(operation as Shape, context, hover);
          break
        case Tool.Text:
          drawText(operation as Text, context, operation.pos);
          break
        case Tool.Image:
          drawImage(operation as Image, context, operation.pos, operation.id, () => {
            renderOperations(operations);
          });
        default:
          break
      }
    });

    // selected box
    if (selectedOperation) {
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = '#d0d0d0';
      context.rect(selectedOperation.pos.x - SELECT_BOX_PADDING, selectedOperation.pos.y - SELECT_BOX_PADDING, selectedOperation.pos.w + 2 * SELECT_BOX_PADDING, selectedOperation.pos.h + 2 * SELECT_BOX_PADDING);
      context.stroke();
      context.closePath();
    }

    restoreGlobalTransform();
  }

  useEffect(() => {
    renderOperations(operationListState.reduced);
  }, [operationListState.reduced, scale, viewMatrix, hoverOperationId, selectedOperation]);

  const handleCompleteOperation = (tool?: Tool, data?: Stroke | Shape | Text | Image | Update | Remove, pos?: Position) => {
    if (!tool) {
      renderOperations(operationListState.reduced);
      return;
    }

    const message = Object.assign({}, data, {
      id: v4(),
      userId,
      timestamp: Date.now(),
      pos: pos as Position,
      tool: tool as Tool,
    });

    operationListDispatch({
      type: 'add',
      payload: {
        operation: message,
      },
    });
  }

  const {
    onMouseMove: onMouseResizeMove,
    onMouseUp: onMouseResizeUp,
    resizer,
  } = useResizeHandler(selectedOperation, viewMatrix, scale, operationListState.queue, operationListDispatch, setSelectedOperation, handleCompleteOperation, refCanvas);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!refCanvas.current) return null;

    const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);

    switch (currentTool) {
      case Tool.Select:
        onSelectMouseDown(e, x, y, scale, operationListState, viewMatrix, setSelectedOperation);
        break;
      case Tool.Stroke:
        onStrokeMouseDown(x, y, currentToolOption);
        break;
      case Tool.Shape:
        onShapeMouseDown(x, y, currentToolOption);
        break;
      case Tool.Text:
        onTextMouseDown(e, currentToolOption, scale, refInput, refCanvas);
        break;
      default:
        break;
    }
  };

  const onDoubleClick = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!refCanvas.current) return null;

    const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);

    switch (currentTool) {
      case Tool.Select:
        onSelectMouseDoubleClick(x, y, scale, operationListState, handleCompleteOperation, viewMatrix, refInput, refCanvas);
        setSelectedOperation(null);
        break;
      default:
        break;
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!refCanvas.current) return null;

    onMouseResizeMove(e);

    const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);

    switch (currentTool) {
      case Tool.Select:
        onSelectMouseMove(e, x, y, scale, operationListState, selectedOperation, setViewMatrix, setHoverOperationId, handleCompleteOperation, operationListDispatch, setSelectedOperation);
        break;
      case Tool.Stroke: {
        saveGlobalTransform();
        refContext.current && onStrokeMouseMove(x, y, refContext.current);
        restoreGlobalTransform();
        break;
      }
      case Tool.Shape: {
        renderOperations(operationListState.reduced);
        saveGlobalTransform();
        refContext.current && onShapeMouseMove(x, y, refContext.current);
        restoreGlobalTransform();
        break;
      }
      default:
        break;
    }
  };

  const onMouseUp = (e: MouseEvent<Element>) => {
    if (!refCanvas.current) return null;

    onMouseResizeUp(e);

    switch (currentTool) {
      case Tool.Select:
        onSelectMouseUp();
        break;

      case Tool.Stroke: {
        refContext.current && onStrokeMouseUp(setCurrentTool, handleCompleteOperation);
        break;
      }
      case Tool.Shape: {
        const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);
        refContext.current && onShapeMouseUp(x, y, setCurrentTool, handleCompleteOperation);
        break;
      }
      default:
        break;
    }
  };

  const onWheel: WheelEventHandler<HTMLCanvasElement> = (evt) => {
    evt.stopPropagation();

    const { deltaY, ctrlKey } = evt;
    const [a, b, c, d, e, f] = viewMatrix;
    let newScale = a + (ctrlKey ? -deltaY : deltaY) / 100;
    newScale = Math.max(Math.min(newScale, MAX_SCALE), MIN_SCALE);

    if (refCanvas.current) {
      const pos = mapClientToCanvas(evt, refCanvas.current, viewMatrix);
      const scaleChange = newScale - a;
      setViewMatrix([newScale, b, c, newScale, e - (pos[0] * scaleChange), f - (pos[1] * scaleChange)]);
    }

    setSelectedOperation(null);
    onScaleChange(newScale);
  };

  const onRemoveOperation: MouseEventHandler<Element> = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (selectedOperation) {
      setSelectedOperation(null);
      handleCompleteOperation(Tool.Remove, { operationId: selectedOperation.id });
    }
  }

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement;

    // high resolution canvas.
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * DPR;
    canvas.height = rect.height * DPR;
    refContext.current = canvas.getContext('2d');

    canvas.oncontextmenu = (e) => {
      e.preventDefault();
    }
  }, []);

  const canvasStyle: CSSProperties = {};
  if (currentTool === Tool.Stroke) {
    canvasStyle.cursor = `url(${sketchStrokeCursor}) 0 14, crosshair`;
  } else if (currentTool === Tool.Shape) {
    canvasStyle.cursor = `crosshair`;
  } else if (currentTool === Tool.Text) {
    canvasStyle.cursor = `text`;
  }

  useImperativeHandle(ref, () => {
    return {
      selectImage: (image: string) => {
        if (image && refCanvas.current) {
          onImageComplete(image, refCanvas.current, viewMatrix, handleCompleteOperation);
        }
      },
      undo: () => {
        setSelectedOperation(null);
        if (operationListState.reduced.length) {
          handleCompleteOperation(Tool.Undo);
        }
      },
      redo: () => {
        setSelectedOperation(null);

        let isRedoable = 0;
        const queue = operationListState.queue;
        for (let i = queue.length - 1; i >= 0; i--) {
          if (queue[i].tool === Tool.Undo) {
            isRedoable++;
          } else if (queue[i].tool === Tool.Redo) {
            isRedoable--;
          } else {
            break;
          }
        }

        if (isRedoable > 0) {
          handleCompleteOperation(Tool.Redo);
        }
      },
      clear: () => {
        setSelectedOperation(null);
        handleCompleteOperation(Tool.Clear);
      },
      save: () => {
        if (refCanvas.current && refContext.current) {
          const canvas = refCanvas.current;
          const w = canvas.width;
          const h = canvas.height;
          const context = refContext.current;
          context.globalCompositeOperation = "destination-over";
          context.fillStyle = "#fff";
          context.fillRect(0, 0, w, h);

          const img = canvas.toDataURL('image/png');

          const a = document.createElement('a');
          a.href = img;
          a.download = 'sketch.png';
          a.click();
        }
      },
    };
  });

  useZoomGesture(refCanvas);

  let settingMenu = null;
  let removeButton = null;
  if (selectedOperation) {
    let content = null;

    switch (selectedOperation.tool) {
      case Tool.Stroke:
        content = useStrokeDropdown({
          strokeSize: (selectedOperation as Stroke).size,
          strokeColor: (selectedOperation as Stroke).color,
        } as ToolOption, (option: ToolOption) => {
          const data = {
            color: option.strokeColor,
            size: option.strokeSize,
          };

          handleCompleteOperation(Tool.Update, {
            operationId: selectedOperation.id,
            data,
          });

          setSelectedOperation({ ...selectedOperation, ...data });
        });
        break;
      case Tool.Shape:
        content = useShapeDropdown({
          shapeType: (selectedOperation as Shape).type,
          shapeBorderColor: (selectedOperation as Shape).color,
          shapeBorderSize: (selectedOperation as Shape).size,
        } as ToolOption, (option: ToolOption) => {
          const data = {
            type: option.shapeType,
            color: option.shapeBorderColor,
            size: option.shapeBorderSize,
          };

          handleCompleteOperation(Tool.Update, {
            operationId: selectedOperation.id,
            data,
          });

          setSelectedOperation({ ...selectedOperation, ...data });
        }, () => { });
        break;
      case Tool.Text: {
        const textOperation: Text = selectedOperation as Text;
        content = useTextDropdown({
          textSize: textOperation.size,
          textColor: textOperation.color,
        } as ToolOption, (option: ToolOption) => {
          const data: Partial<Operation> = {
            color: option.textColor,
            size: option.textSize,
          };

          if (refContext.current && option.textSize !== textOperation.size) {
            const context = refContext.current;

            // font size has changed, need to update pos
            context.font = `${option.textSize}px ${font}`;
            data.pos = {
              ...selectedOperation.pos,
              w: context.measureText(textOperation.text).width,
              h: textOperation.text.split('\n').length * option.textSize,
            };
          }

          handleCompleteOperation(Tool.Update, {
            operationId: selectedOperation.id,
            data,
          });

          setSelectedOperation({ ...selectedOperation, ...data });
        }, () => { });
        break;
      }
      default:
        break;
    }

    const resultRect = {
      xMin: selectedOperation.pos.x,
      xMax: selectedOperation.pos.x + selectedOperation.pos.w,
      yMin: selectedOperation.pos.y,
      yMax: selectedOperation.pos.y + selectedOperation.pos.h,
    };

    const [a, b, c, d, e, f] = viewMatrix;
    const selectPadding = Math.max(SELECT_PADDING * 1 / scale || 0, SELECT_PADDING);
    const left = resultRect.xMin;
    const top = resultRect.yMax + selectPadding;

    const menuStyle: CSSProperties = {
      position: 'absolute',
      left: (a * left + c * top + e),
      top: (b * left + d * top + f),
    };

    settingMenu = (
      <div style={menuStyle} onMouseDown={stopPropagation}>
        {content}
      </div>
    );


    const removeX = selectedOperation.tool === Tool.Text ? resultRect.xMax - 5 / scale : resultRect.xMax - 7 / scale;
    const removeY = selectedOperation.tool === Tool.Text ? resultRect.yMin - 11 / scale : resultRect.yMin - 9 / scale;
    const removeStyle: CSSProperties = {
      position: 'absolute',
      left: (a * removeX + c * removeY + e),
      top: (b * removeX + d * removeY + f),
      background: 'white',
      lineHeight: '16px',
      fontSize: '16px',
      borderRadius: '50%',
      cursor: 'pointer',
      color: '#f45b6c',
    };

    removeButton = (
      <div style={removeStyle} onMouseDown={onRemoveOperation}>
        <Icon type="close-circle" theme="filled" />
      </div>
    )
  }

  return (
    <div
      className={styles.container}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
    >
      <canvas
        ref={refCanvas}
        onDoubleClick={onDoubleClick}
        onWheel={onWheel}
        className={styles.canvas}
        style={canvasStyle}
      />

      <div
        contentEditable="true"
        suppressContentEditableWarning
        ref={refInput}
        style={{ fontSize: `${12 * scale}px`, }}
        className={styles.textInput}
        onBlur={() => {
          onTextComplete(refInput, refCanvas, viewMatrix, scale, handleCompleteOperation, setCurrentTool);
        }}
      >
        输入文本
      </div>

      {settingMenu}
      {removeButton}
      {resizer}
    </div>
  );
}

export default forwardRef(SketchPad);