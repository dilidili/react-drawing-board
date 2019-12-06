import Tool from './enums/Tool';

interface Point {
  x: number,
  y: number,
}

interface Stroke {
  tool: Tool,
  color: string,
  size: number,
  points: Point[],
}

// Stroke tool
let stroke: Stroke | null = null;

let points: Point[] = [];

const drawLine = (context: CanvasRenderingContext2D, item: Stroke, start: Point, { x, y } : Point) => {
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

export function onStrokeMouseDown(x: number, y: number) {
  stroke = {
    tool: Tool.Stroke,
    color: '#000',
    size: 12,
    points: [{ x, y }]
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

export function onStrokeMouseUp(setCurrentTool: (tool: Tool) => void) {
  if (!stroke) return;

  // click to back to select mode.
  if (stroke.points.length < 6) {
    setCurrentTool(Tool.Select);

    points = [];
    stroke = null;

    return;
  }

  const item = stroke;
  points = [];
  stroke = null;

  return [item];
}