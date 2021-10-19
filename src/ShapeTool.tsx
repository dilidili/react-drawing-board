import Tool, { ToolOption, ShapeType, strokeSize, strokeColor } from './enums/Tool';
import React, { useContext } from 'react';
import Icon from './icons/Icon';
import './ShapeTool.less';

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Shape = {
  type: ShapeType;
  color: string;
  size: number;
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  } | null;
};

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
};

const draw = (
  item: Shape,
  mouseX: number,
  mouseY: number,
  context: CanvasRenderingContext2D,
  hover: boolean,
) => {
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
    context.closePath();

    if (hover) {
      context.beginPath();
      context.strokeStyle = '#3AB1FE';
      context.lineWidth = item.size / 2;
      context.rect(
        startX - item.size / 2,
        startY - item.size / 2,
        widthX + item.size,
        widthY + item.size,
      );

      context.stroke();
      context.closePath();
    }
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
        xPos = centerX - radiusY * Math.sin(i) * Math.sin(0) + radiusX * Math.cos(i) * Math.cos(0);
        yPos = centerY + radiusX * Math.cos(i) * Math.sin(0) + radiusY * Math.sin(i) * Math.cos(0);
        if (i === 0) {
          context.moveTo(xPos, yPos);
        } else {
          context.lineTo(xPos, yPos);
        }
      }
    }

    context.stroke();
    context.closePath();

    if (hover) {
      context.beginPath();
      context.strokeStyle = '#3AB1FE';
      context.lineWidth = item.size / 2;

      if (typeof context.ellipse === 'function') {
        context.ellipse(
          centerX,
          centerY,
          radiusX + item.size / 2,
          radiusY + item.size / 2,
          0,
          0,
          2 * Math.PI,
        );
      } else {
        let xPos;
        let yPos;
        let i = 0;
        for (i; i < 2 * Math.PI; i += 0.01) {
          xPos =
            centerX -
            (radiusY + item.size / 2) * Math.sin(i) * Math.sin(0) +
            (radiusX + item.size / 2) * Math.cos(i) * Math.cos(0);
          yPos =
            centerY +
            (radiusX + item.size / 2) * Math.cos(i) * Math.sin(0) +
            (radiusY + item.size / 2) * Math.sin(i) * Math.cos(0);
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
};

export const onShapeMouseUp = (
  x: number,
  y: number,
  setCurrentTool: (tool: Tool) => void,
  handleCompleteOperation: (tool?: Tool, data?: Shape, pos?: Position) => void,
) => {
  if (!shape) return;

  const item = shape;
  shape = null;
  item.end = { x, y };

  // avoid touch by mistake.
  if (Math.abs(item.start.x - item.end.x) + Math.abs(item.start.x - item.end.x) < 6) {
    return;
  }

  handleCompleteOperation(Tool.Shape, item, {
    x: Math.min(item.start.x, item.end.x),
    y: Math.min(item.start.y, item.end.y),
    w: Math.abs(item.end.x - item.start.x),
    h: Math.abs(item.end.y - item.start.y),
  });

  setCurrentTool(Tool.Select);

  return [item];
};

export const onShapeMouseMove = (x: number, y: number, context: CanvasRenderingContext2D) => {
  if (!shape) return;

  draw(shape, x, y, context, false);
};

export const drawRectangle = (rect: Shape, context: CanvasRenderingContext2D, hover: boolean) => {
  if (!rect.end) return null;

  draw(rect, rect.end.x, rect.end.y, context, hover);
};

export const useShapeDropdown = (config: {
  currentToolOption: ToolOption;
  setCurrentToolOption: (option: ToolOption) => void;
  setCurrentTool: (tool: Tool) => void;
  prefixCls: string;
}) => {
  const {
    currentToolOption,
    setCurrentToolOption,
    setCurrentTool,
    prefixCls: basePrefixCls,
  } = config;

  const prefixCls = basePrefixCls + '-strokeTool';

  return (
    <div className={`${prefixCls}-strokeMenu`}>
      <div className={`${prefixCls}-shape`}>
        <div
          onClick={(evt) => {
            evt.stopPropagation();
            setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Rectangle });
            setCurrentTool(Tool.Shape);
          }}
          onTouchStart={(evt) => {
            evt.stopPropagation();
            setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Rectangle });
            setCurrentTool(Tool.Shape);
          }}
          className={`${prefixCls}-shapeItem`}
          style={
            currentToolOption.shapeType === ShapeType.Rectangle
              ? { background: 'rgba(238, 238, 238, 1)' }
              : {}
          }
        >
          <div
            className={`${prefixCls}-rect`}
            style={
              currentToolOption.shapeType === ShapeType.Rectangle
                ? { borderColor: currentToolOption.shapeBorderColor }
                : {}
            }
          />
        </div>

        <div
          onTouchStart={(evt) => {
            evt.stopPropagation();
            setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Oval });
            setCurrentTool(Tool.Shape);
          }}
          onClick={(evt) => {
            evt.stopPropagation();
            setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Oval });
            setCurrentTool(Tool.Shape);
          }}
          className={`${prefixCls}-shapeItem`}
          style={
            currentToolOption.shapeType === ShapeType.Oval
              ? { background: 'rgba(238, 238, 238, 1)' }
              : {}
          }
        >
          <div
            className={`${prefixCls}-circle`}
            style={
              currentToolOption.shapeType === ShapeType.Oval
                ? { borderColor: currentToolOption.shapeBorderColor }
                : {}
            }
          />
        </div>
      </div>

      <div className={`${prefixCls}-colorAndSize`}>
        <div className={`${prefixCls}-strokeSelector`}>
          {strokeSize.map((size) => {
            return (
              <div
                key={size}
                onTouchStart={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, shapeBorderSize: size });
                  setCurrentTool(Tool.Shape);
                }}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, shapeBorderSize: size });
                  setCurrentTool(Tool.Shape);
                }}
                style={{
                  width: size + 4,
                  height: size + 4,
                  background: size === currentToolOption.shapeBorderSize ? '#666666' : '#EEEEEE',
                }}
              ></div>
            );
          })}
        </div>
        <div className={`${prefixCls}-split`}></div>
        <div className={`${prefixCls}-palette`}>
          {strokeColor.map((color) => {
            return (
              <div
                className={`${prefixCls}-color`}
                key={color}
                onTouchStart={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, shapeBorderColor: color });
                  setCurrentTool(Tool.Shape);
                }}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, shapeBorderColor: color });
                  setCurrentTool(Tool.Shape);
                }}
              >
                <div className={`${prefixCls}-fill`} style={{ background: color }}></div>
                {currentToolOption.shapeBorderColor === color ? (
                  <Icon
                    type="check"
                    style={color === '#ffffff' ? { color: '#979797' } : { color: '#fff' }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
