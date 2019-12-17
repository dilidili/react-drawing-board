import React, { useRef, useEffect, useState, MouseEvent, CSSProperties, useImperativeHandle, forwardRef, WheelEventHandler, useReducer, Reducer } from 'react';
import Tool, { ToolOption, Position, MAX_SCALE, MIN_SCALE, } from './enums/Tool';
import { mapClientToCanvas } from './utils';
import { onStrokeMouseDown, onStrokeMouseMove, onStrokeMouseUp, drawStroke, Stroke, useStrokeDropdown, moveStoke } from './StrokeTool';
import { onShapeMouseDown, onShapeMouseMove, onShapeMouseUp, Shape, drawRectangle, useShapeDropdown } from './ShapeTool';
import { onImageComplete, Image, drawImage } from './ImageTool';
import { onTextMouseDown, onTextComplete, drawText, Text, useTextDropdown, font } from './TextTool';
import { onSelectMouseDown, onSelectMouseMove, onSelectMouseUp, SELECT_PADDING } from './SelectTool';
import { v4 } from 'uuid';
import sketchStrokeCursor from './images/sketch_stroke_cursor.png';
import { useZoomGesture } from './gesture';
import styles from './SketchPad.less';
import Operation from 'antd/lib/transfer/operation';

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

export type Operation = (Stroke | Shape | Text | Image | Update | Undo) & {
  id: string;
  userId: string;
  timestamp: number;
  pos: Position;
  tool: Tool;
};

export type Undo = {
  operationId: string,
}

export type Update = {
  operationId: string,
  data: Partial<((Stroke | Shape | Text | Image) & {
    pos: Position,
  })>,
};

const DPR = window.devicePixelRatio || 1;

export type OperationListState = {
  queue: Operation[],
  reduced: Operation[],
}

const initialOperationState: OperationListState = {
  queue: [],
  reduced: [],
};

const mergeOperations = (operations: Operation[]): Operation[] => {
  const undoItemIds = operations.filter(v => v.tool === Tool.Undo).map(v => (v as Undo ).operationId);
  operations = operations.filter(v => v.tool !== Tool.Undo && undoItemIds.indexOf(v.id) < 0);

  operations.forEach(v => {
    if (v.tool === Tool.Update) {
      const update = v as Update;
      const targetIndex = operations.findIndex(w => w.id === update.operationId);
      if (~targetIndex) {
        const target = operations[targetIndex];
        operations[targetIndex] = { ...operations[targetIndex], ...update.data };

        // move other properties related to pos
        if (update.data.pos) {
          switch(target.tool) {
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
              break
          }
        }
      }
    }
  });

  operations = operations.filter(v => v.tool !== Tool.Update);

  return operations;
}

const operationListReducer: Reducer<OperationListState, any> = (state, action) => {
  switch(action.type) {
    case 'add': {
      let operation = action.payload.operation as Operation;
      const newQueue = state.queue.concat([operation]);

      return {
        queue: newQueue,
        reduced: mergeOperations(newQueue),
      };
    }
    case 'replaceLast': {
      let operation = action.payload.operation as Operation;
      const newQueue = state.queue.slice(0, -1).concat([operation]);

      return {
        queue: newQueue,
        reduced: mergeOperations(newQueue),
      }
    }
    default:
      return state;
  }
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
  const [undoHistory, setUndoHistory] = useState<Operation[]>([]);

  const saveGlobalTransform = () => {
    if (!refContext.current) return;

    const context = refContext.current;

    context.save();
    context.scale(DPR, DPR);
    const [a, b, c, d, e, f]  = viewMatrix;
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
      context.rect(selectedOperation.pos.x - 3, selectedOperation.pos.y - 3, selectedOperation.pos.w + 6, selectedOperation.pos.h + 6);
      context.stroke();
      context.closePath();
    }

    restoreGlobalTransform();
  }

  useEffect(() => {
    renderOperations(operationListState.reduced);
  }, [operationListState.reduced, scale, viewMatrix, hoverOperationId, selectedOperation]);

  const handleCompleteOperation = (tool?: Tool, data?: Stroke | Shape | Text | Image | Update | Undo, pos?: Position) => {
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

    setUndoHistory([]);
    operationListDispatch({
      type: 'add',
      payload: {
        operation: message,
      },
    });
  }

  const onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
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
        onTextMouseDown(e, x, y, currentToolOption, refInput, refCanvas);
        break;
      default:
        break;
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!refCanvas.current) return null;

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

  const onMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!refCanvas.current) return null;

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

    onScaleChange(newScale);
  };

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement;

    // high resolution canvas.
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * DPR;
    canvas.height = rect.height * DPR;
    refContext.current = canvas.getContext('2d');

    canvas.oncontextmenu = (e) => {
      e.preventDefault()
    }
  }, []);

  const canvasStyle: CSSProperties  = {};
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
        const undoItem = operationListState.queue[operationListState.queue.length - 1];

        if (undoItem) {
          handleCompleteOperation(Tool.Undo, { operationId: undoItem.id });
          setUndoHistory((undoHistory) => {
            return undoHistory.concat([undoItem]);
          });
        }
      },
      redo: () => {
        if (undoHistory.length > 0) {
          const redoItem = undoHistory[undoHistory.length - 1];

          operationListDispatch({
            type: 'add',
            payload: {
              operation: redoItem,
            }
          });

          setUndoHistory(undoHistory.slice(0, -1));
        }
      },
      clear: () => {
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
  if (selectedOperation) {
    let content = null;

    switch(selectedOperation.tool) {
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
        }, () => {});
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
        }, () => {});
        break;
      }
      default:
        break;
    }

    const resultRect = {
      xMin: selectedOperation.pos.x,
      yMax: selectedOperation.pos.y + selectedOperation.pos.h,
    };

    const [a, b, c, d, e, f] = viewMatrix;
    const selectPadding = Math.max(SELECT_PADDING * 1 / scale || 0, SELECT_PADDING);
    const left = resultRect.xMin;
    const top = resultRect.yMax + selectPadding;

    const style: CSSProperties = {
      position: 'absolute',
      left: (a * left + c * top + e),
      top: (b * left + d * top + f),
    };

    settingMenu = (
      <div style={style}>
        {content}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <canvas
        ref={refCanvas}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
        onMouseUp={onMouseUp}
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
    </div>
  );
}

export default forwardRef(SketchPad);