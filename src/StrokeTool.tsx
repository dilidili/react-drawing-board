import React from 'react';
import Tool, { strokeSize, strokeColor, ToolOption } from './enums/Tool';
import { isMobileDevice } from './utils';
import Icon from './icons/Icon';
import './StrokeTool.less';

interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  color: string;
  size: number;
  points: Point[];
}

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Stroke tool
let stroke: Stroke | null = null;

let points: Point[] = [];

const drawLine = (
  context: CanvasRenderingContext2D,
  item: Stroke,
  start: Point,
  { x, y }: Point,
) => {
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.beginPath();
  context.lineWidth = item.size;
  context.strokeStyle = item.color;
  context.globalCompositeOperation = 'source-over';
  context.moveTo(start.x, start.y);

  const xc = (start.x + x) / 2;
  const yc = (start.y + y) / 2;
  context.quadraticCurveTo(xc, yc, x, y);

  context.closePath();
  context.stroke();
};

export const drawStroke = (stroke: Stroke, context: CanvasRenderingContext2D, hover: boolean) => {
  const points = stroke.points.filter((_, index) => index % 2 === 0);
  if (points.length < 3) {
    return;
  }

  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.beginPath();
  context.lineWidth = stroke.size;
  context.globalCompositeOperation = 'source-over';
  context.strokeStyle = hover ? '#3AB1FE' : stroke.color;

  // move to the first point
  context.moveTo(points[0].x, points[0].y);

  let i = 0;
  for (i = 1; i < points.length - 2; i++) {
    var xc = (points[i].x + points[i + 1].x) / 2;
    var yc = (points[i].y + points[i + 1].y) / 2;
    context.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }

  // curve through the last two points
  context.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);

  context.stroke();
};

export function onStrokeMouseDown(x: number, y: number, toolOption: ToolOption) {
  stroke = {
    color: toolOption.strokeColor,
    size: toolOption.strokeSize,
    points: [{ x, y }],
  };
  return [stroke];
}

export function onStrokeMouseMove(x: number, y: number, context: CanvasRenderingContext2D) {
  if (!stroke) return [];

  const newPoint = { x, y };
  const start = stroke.points.slice(-1)[0];
  drawLine(context, stroke, start, newPoint);
  stroke.points.push(newPoint);
  points.push(newPoint);

  return [stroke];
}

export function onStrokeMouseUp(
  setCurrentTool: (tool: Tool) => void,
  handleCompleteOperation: (tool?: Tool, data?: Stroke, pos?: Position) => void,
  currentTool = Tool.Stroke,
) {
  if (!stroke) {
    return;
  }

  // click to back to select mode.
  if (stroke.points.length < 6) {
    if (!isMobileDevice) {
      setCurrentTool(Tool.Select);
    }

    handleCompleteOperation();

    points = [];
    stroke = null;

    return;
  }

  const item = stroke;
  points = [];
  stroke = null;

  if (item) {
    let lineData = item;
    let pos = null;

    let xMax = -Infinity,
      yMax = -Infinity,
      xMin = lineData.points[0].x,
      yMin = lineData.points[0].y;

    lineData.points.forEach((p) => {
      if (p.x > xMax) {
        xMax = p.x;
      }
      if (p.x < xMin) {
        xMin = p.x;
      }
      if (p.y > yMax) {
        yMax = p.y;
      }
      if (p.y < yMin) {
        yMin = p.y;
      }
    });

    pos = {
      x: xMin,
      y: yMin,
      w: xMax - xMin,
      h: yMax - yMin,
    };

    handleCompleteOperation(currentTool, lineData, pos);
  }

  return [item];
}

export const useStrokeDropdown = (config: {
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
      <div className={`${prefixCls}-colorAndSize`}>
        <div className={`${prefixCls}-strokeSelector`}>
          {strokeSize.map((size) => {
            return (
              <div
                key={size}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, strokeSize: size });
                  setCurrentTool && setCurrentTool(Tool.Stroke);
                }}
                onTouchStart={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, strokeSize: size });
                  setCurrentTool && setCurrentTool(Tool.Stroke);
                }}
                style={{
                  width: size + 4,
                  height: size + 4,
                  background: size === currentToolOption.strokeSize ? '#666666' : '#EEEEEE',
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
                onClick={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, strokeColor: color });
                  setCurrentTool && setCurrentTool(Tool.Stroke);
                }}
                onTouchStart={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, strokeColor: color });
                  setCurrentTool && setCurrentTool(Tool.Stroke);
                }}
              >
                <div className={`${prefixCls}-fill`} style={{ background: color }}></div>
                {currentToolOption.strokeColor === color ? (
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

export const moveStoke = (prev: Stroke, oldPos: Position, newPos: Position) => {
  const diffX = newPos.x - oldPos.x;
  const diffY = newPos.y - oldPos.y;

  return prev.points.map((p) => ({
    x: p.x + diffX,
    y: p.y + diffY,
  }));
};
