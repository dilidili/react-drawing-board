import React, { useRef, useEffect, useState, MouseEvent, CSSProperties, useImperativeHandle, forwardRef, WheelEventHandler } from 'react';
import Tool, { ToolOption, Position, MAX_SCALE, MIN_SCALE } from './enums/Tool';
import { mapClientToCanvas } from './utils';
import { onStrokeMouseDown, onStrokeMouseMove, onStrokeMouseUp, drawStroke, Stroke } from './StrokeTool';
import { onShapeMouseDown, onShapeMouseMove, onShapeMouseUp, Shape, drawRectangle } from './ShapeTool';
import { onImageComplete, Image, drawImage } from './ImageTool';
import { onTextMouseDown, onTextComplete, drawText, Text } from './TextTool';
import { v4 } from 'uuid';
import sketchStrokeCursor from './images/sketch_stroke_cursor.png';
import { useZoomGesture } from './gesture';
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
};

type Operation = (Stroke | Shape | Text | Image) & {
  id: string;
  userId: string;
  timestamp: number;
  pos: Position;
  tool: Tool;
};

const DPR = window.devicePixelRatio || 1;

const SketchPad: React.FC<SketchPadProps> = (props, ref) => {
  const { currentTool, setCurrentTool, userId, currentToolOption, onScaleChange, scale } = props;
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refContext = useRef<CanvasRenderingContext2D | null>(null);
  const refInput = useRef<HTMLDivElement>(null);

  // a  c  e
  // b  d  f
  // 0  0  1
  const [viewMatrix, setViewMatrix] = useState([1, 0, 0, 1, 0, 0]);

  const [operationList, setOperationList] = useState<Operation[]>([]);
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
      switch (operation.tool) {
        case Tool.Clear:
          restoreGlobalTransform();
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          saveGlobalTransform();
          break;
        case Tool.Stroke:
          drawStroke(operation as Stroke, context);
          break
        case Tool.Shape:
          drawRectangle(operation as Shape, context);
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
    restoreGlobalTransform();
  }

  useEffect(() => {
    renderOperations(operationList);
  }, [operationList, scale]);

  const handleCompleteOperation = (tool?: Tool, data?: Stroke | Shape | Text | Image, pos?: Position) => {
    if (!tool) {
      renderOperations(operationList);
    }

    const message = Object.assign({}, data, {
      id: v4(),
      userId,
      timestamp: Date.now(),
      pos: pos as Position,
      tool: tool as Tool,
    });

    let newOperationList = operationList;
    setUndoHistory([]);
    newOperationList = operationList.concat([message]);
    setOperationList(newOperationList);
  }

  const onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!refCanvas.current) return null;

    const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);

    switch (currentTool) {
      case Tool.Stroke:
        onStrokeMouseDown(x, y, currentToolOption);
        break
      case Tool.Shape:
        onShapeMouseDown(x, y, currentToolOption);
        break
      case Tool.Text:
        onTextMouseDown(e, x, y, currentToolOption, refInput, refCanvas);
        break
      default:
        break
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!refCanvas.current) return null;

    const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);

    switch (currentTool) {
      case Tool.Stroke: {
        saveGlobalTransform();
        refContext.current && onStrokeMouseMove(x, y, refContext.current);
        restoreGlobalTransform();
        break;
      }
      case Tool.Shape: {
        renderOperations(operationList);
        saveGlobalTransform();
        refContext.current && onShapeMouseMove(x, y, refContext.current);
        restoreGlobalTransform();
        break;
      }
      default:
        break
    }
  };

  const onMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!refCanvas.current) return null;

    switch (currentTool) {
      case Tool.Stroke: {
        refContext.current && onStrokeMouseUp(setCurrentTool, handleCompleteOperation);
        break
      }
      case Tool.Shape: {
        const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);
        refContext.current && onShapeMouseUp(x, y, setCurrentTool, handleCompleteOperation);
        break
      }
      default:
        break
    }
  };

  const onWheel: WheelEventHandler<HTMLCanvasElement> = (evt) => {
    evt.stopPropagation();

    const { deltaY, ctrlKey } = evt;
    const [a, b, c, d, e, f] = viewMatrix;
    let newScale = a + (ctrlKey ? -deltaY * 1.3 : deltaY) / 100;
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
        const undoItem = operationList[operationList.length - 1];

        if (undoItem) {
          setOperationList(operationList.slice(0, -1));
          setUndoHistory((undoHistory) => {
            return undoHistory.concat([undoItem]);
          });
        }
      },
      redo: () => {
        if (undoHistory.length > 0) {
          const redoItem = undoHistory[undoHistory.length - 1];

          setOperationList((operationList) => {
            return operationList.concat([redoItem]);
          });

          setUndoHistory(undoHistory.slice(0, -1));
        }
      },
      clear: () => {
        handleCompleteOperation(Tool.Clear);
      },
    };
  });

  useZoomGesture(refCanvas);

  return (
    <div className={styles.container}>
      <canvas
        ref={refCanvas}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
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
    </div>
  );
}

export default forwardRef(SketchPad);