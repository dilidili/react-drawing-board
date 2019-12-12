import Tool, { ToolOption, ShapeType, strokeSize, strokeColor, } from './enums/Tool';
import React from 'react';
import { Icon } from 'antd';
import styles from './ShapeTool.less'

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Shape = {
  type: ShapeType,
  color: string;
  size: number;
  start: {
    x: number,
    y: number,
  };
  end: {
    x: number,
    y: number,
  } | null;
}

let shape: Shape | null = null;

export const onShapeMouseDown = (x: number, y: number, toolOption: ToolOption) => {
  shape = {
    type: toolOption.shapeType,
    color: toolOption.shapeBorderColor,
    size: toolOption.shapeBorderSize,
    start: { x, y },
    end: null,
  };

  return [shape];
}

const draw = (item: Shape, mouseX: number, mouseY: number, context: CanvasRenderingContext2D) => {
  const startX = mouseX < item.start.x ? mouseX : item.start.x;
  const startY = mouseY < item.start.y ? mouseY : item.start.y;
  const widthX = Math.abs(item.start.x - mouseX);
  const widthY = Math.abs(item.start.y - mouseY);

  if (item.type === ShapeType.Rectangle) {
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;

    context.rect(startX, startY, widthX, widthY);
    context.stroke();
  } else if (item.type === ShapeType.Oval) {
    const endX = mouseX >= item.start.x ? mouseX : item.start.x;
    const endY = mouseY >= item.start.y ? mouseY : item.start.y;
    const radiusX = (endX - startX) * 0.5;
    const radiusY = (endY - startY) * 0.5;
    const centerX = startX + radiusX;
    const centerY = startY + radiusY;

    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;

    if (typeof context.ellipse === 'function') {
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    } else {
      let xPos;
      let yPos;
      let i = 0;
      for (i; i < 2 * Math.PI; i += 0.01) {
        xPos = centerX - (radiusY * Math.sin(i)) * Math.sin(0) + (radiusX * Math.cos(i)) * Math.cos(0);
        yPos = centerY + (radiusX * Math.cos(i)) * Math.sin(0) + (radiusY * Math.sin(i)) * Math.cos(0);
        if (i === 0) {
          context.moveTo(xPos, yPos);
        } else {
          context.lineTo(xPos, yPos);
        }
      }
    }

    context.stroke();
    context.closePath();
  }
}

export const onShapeMouseUp = (x: number, y: number, setCurrentTool: (tool: Tool) => void, handleCompleteOperation: (tool?: Tool, data?: Shape, pos?: Position) => void) => {
  if (!shape) return;

  const item = shape;
  shape = null;
  item.end = { x, y };

  handleCompleteOperation(Tool.Shape, item, {
    x: Math.min(item.start.x, item.end.x),
    y: Math.min(item.start.y, item.end.y),
    w: Math.abs(item.end.x - item.start.x),
    h: Math.abs(item.end.y - item.start.y),
  });

  setCurrentTool(Tool.Select);

  return [item];
}

export const onShapeMouseMove = (x: number, y: number, context: CanvasRenderingContext2D) => {
  if (!shape) return;

  draw(shape, x, y, context);
}

export const drawRectangle = (rect: Shape, context: CanvasRenderingContext2D) => {
  if (!rect.end) return null;

  draw(rect, rect.end.x, rect.end.y, context);
}

export const useShapeDropdown = (currentToolOption: ToolOption, setCurrentToolOption: (option: ToolOption) => void, setCurrentTool: (tool: Tool) => void) => {
  return (
    <div className={styles.strokeMenu}>
      <div className={styles.shape}>
        <div onClick={(evt) => {
          evt.stopPropagation();
          setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Rectangle });
          setCurrentTool(Tool.Shape);
        }} className={styles.shapeItem} style={currentToolOption.shapeType === ShapeType.Rectangle ? { background: 'rgba(238, 238, 238, 1)' } : {}}>
          <div className={styles.rect} style={ currentToolOption.shapeType === ShapeType.Rectangle ? { borderColor: currentToolOption.shapeBorderColor } : {}} />
        </div>

        <div onClick={(evt) => {
          evt.stopPropagation();
          setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Oval });
          setCurrentTool(Tool.Shape);
        }} className={styles.shapeItem} style={currentToolOption.shapeType === ShapeType.Oval ? { background: 'rgba(238, 238, 238, 1)' } : {}}>
          <div className={styles.circle} style={ currentToolOption.shapeType === ShapeType.Oval ? { borderColor: currentToolOption.shapeBorderColor } : {}} />
        </div>
      </div>

      <div className={styles.colorAndSize}>
        <div className={styles.strokeSelector}>
          {strokeSize.map(size => {
            return (
              <div
                key={size}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, shapeBorderSize: size });
                  setCurrentTool(Tool.Shape);
                }}
                style={{ width: size + 4, height: size + 4, background: size === currentToolOption.shapeBorderSize ? '#666666' : '#EEEEEE' }}
              ></div>
            )
          })}
        </div>
        <div className={styles.split}></div>
        <div className={styles.palatte}>
          {strokeColor.map(color => {
            return <div className={styles.color} key={color} onClick={(evt) => {
              evt.stopPropagation();
              setCurrentToolOption({ ...currentToolOption, shapeBorderColor: color });
              setCurrentTool(Tool.Shape);
            }}>
              <div className={styles.fill} style={{ background: color }}></div>
              {currentToolOption.shapeBorderColor === color ? <Icon type="check" style={color === '#ffffff' ? { color: '#979797' } : {}} /> : null}
            </div>
          })}
        </div>
      </div>
    </div>
  )
}