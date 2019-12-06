import React, { useRef, useEffect, useState, MouseEvent } from 'react';
import Tool from './enums/Tool';
import { mapClientToCanvas } from './utils';
import { onStrokeMouseDown, onStrokeMouseMove, onStrokeMouseUp } from './StrokeTool';
import styles from './SketchPad.less';

export interface SketchPadProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
}

const DPR = window.devicePixelRatio || 1;

const SketchPad: React.FC<SketchPadProps> = (props) => {
  const { currentTool, setCurrentTool } = props;
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refContext = useRef<CanvasRenderingContext2D | null>(null);

  // a  c  e
  // b  d  f
  // 0  0  1
  const [viewMatrix, setViewMatrix] = useState([1, 0, 0, 1, 0, 0]);

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

  const onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!refCanvas.current) return null;

    const [x, y] = mapClientToCanvas(e, refCanvas.current, viewMatrix);

    switch (currentTool) {
      case Tool.Stroke:
        onStrokeMouseDown(x, y);
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
        refContext.current && onStrokeMouseUp(setCurrentTool);
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

  return (
    <div className={styles.container}>
      <canvas
        ref={refCanvas}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        className={styles.canvas}
      />
    </div>
  );
}

export default SketchPad;