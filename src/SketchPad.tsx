import React, { useRef, useEffect, useState, MouseEvent, CSSProperties } from 'react';
import Tool, { ToolOption } from './enums/Tool';
import { mapClientToCanvas } from './utils';
import { onStrokeMouseDown, onStrokeMouseMove, onStrokeMouseUp, drawStroke, Position, OperationData } from './StrokeTool';
import { v4 } from 'uuid';
import sketchStrokeCursor from './images/sketch_stroke_cursor.png';
import styles from './SketchPad.less';

export interface SketchPadProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
  currentToolOption: ToolOption;
  userId: string;
}

type Operation = OperationData & {
  id: string;
  userId: string;
  timestamp: number;
};

const DPR = window.devicePixelRatio || 1;

const SketchPad: React.FC<SketchPadProps> = (props) => {
  const { currentTool, setCurrentTool, userId, currentToolOption } = props;
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refContext = useRef<CanvasRenderingContext2D | null>(null);

  // a  c  e
  // b  d  f
  // 0  0  1
  const [viewMatrix, setViewMatrix] = useState([1, 0, 0, 1, 0, 0]);

  const [operationList, setOperationList] = useState<Operation[]>([]);

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
        case Tool.Stroke:
          drawStroke(operation, context);
          break
        default:
          break
      }
    });
    restoreGlobalTransform();
  }

  const handleCompleteOperation = (tool?: Tool, data?: OperationData, pos?: Position) => {
    if (!tool) {
      renderOperations(operationList);
    }

    const message = Object.assign({}, data, {
      id: v4(),
      userId,
      timestamp: Date.now(),
    });

    let newOperationList = operationList;
    switch(tool) {
      default:
        newOperationList = operationList.concat([message]);
        break;
    }

    setOperationList(newOperationList);
    renderOperations(newOperationList);
  }

  const onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!refCanvas.current) return null;

    const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);

    switch (currentTool) {
      case Tool.Stroke:
        onStrokeMouseDown(x, y, currentToolOption);
        break
      default:
        break
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!refCanvas.current) return null;

    switch (currentTool) {
      case Tool.Stroke: {
        const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);
        saveGlobalTransform();
        refContext.current && onStrokeMouseMove(x, y, refContext.current);
        restoreGlobalTransform();
        break
      }
      default:
        break
    }
  };

  const onMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
    switch (currentTool) {
      case Tool.Stroke: {
        refContext.current && onStrokeMouseUp(setCurrentTool, handleCompleteOperation);
        break
      }
      default:
        break
    }
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
  }

  return (
    <div className={styles.container}>
      <canvas
        ref={refCanvas}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        className={styles.canvas}
        style={canvasStyle}
      />
    </div>
  );
}

export default SketchPad;