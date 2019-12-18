import { MouseEvent } from 'react';
import Tool, { Position } from './enums/Tool';
import { Stroke } from './StrokeTool';
import { Operation, Update, OperationListState } from './SketchPad';
import { matrix_multiply } from './utils'

let lastSelectX = 0;
let lastSelectY = 0;
let isDragging = false;
let startDragPos: Position | null = null; 
let startDragViewMatrix = [1, 0, 0, 1, 0, 0];

export const SELECT_PADDING = 10;

const getRotatedWidgets = (px: number, py: number, ox: number, oy: number, rotate: number) => {
  const x = Math.cos(rotate) * (px - ox) - Math.sin(rotate) * (py - oy) + ox;
  const y = Math.sin(rotate) * (px - ox) + Math.cos(rotate) * (py - oy) + oy;
  return [x, y];
}

function rectContain({ x: parentX, y: parentY, w: width, h: height, }: Position, [x, y]: number[], rotate: number,) {
  if (rotate) {
    [x, y] = getRotatedWidgets(x, y, parentX + width / 2, parentY + height / 2, -rotate);
  }

  return !!(x >= parentX && x <= parentX + width && y >= parentY && y <= parentY + height);
}

const findSelectedItem = (items: Operation[], pos:[number, number], scale: number) => {
  const selectPadding = Math.max(SELECT_PADDING * 1 / scale || 0, SELECT_PADDING);

  for(let i = items.length - 1; i >= 0; i--) {
    const item = items[i];

    if (item.tool === Tool.Stroke && rectContain(item.pos, pos, 0)) {
      const points = (item as Stroke).points;
      if (points.some(p => (p.x - pos[0])**2 + (p.y - pos[1])**2 < (selectPadding * 2)**2)) {
        return item;
      }
    } else if (item.tool === Tool.Shape || item.tool === Tool.Text || item.tool === Tool.Image) {
      const rotate = 0;

      const selectedItem = rectContain({
        x: item.pos.x - selectPadding,
        y: item.pos.y - selectPadding,
        w: item.pos.w + 2 * selectPadding,
        h: item.pos.h + 2 * selectPadding,
      }, pos, rotate) ? item: null;

      if (selectedItem) {
        return { ...selectedItem };
      }
    }
  }

  return null;
}

export const onSelectMouseDown = (e: MouseEvent<HTMLCanvasElement>, x: number, y: number, scale: number, operationListState: OperationListState, viewMatrix: number[], setSelectedOperation: (item: Operation | null) => void) => {
  const pos: [number, number] = [x, y];

  lastSelectX = e.clientX;
  lastSelectY = e.clientY;

  let selectedItem: Operation | null = findSelectedItem(operationListState.reduced, pos, scale);
  setSelectedOperation(selectedItem);
  if (selectedItem !== null) {
    startDragPos = selectedItem.pos;
  }

  isDragging = true;
  startDragViewMatrix = viewMatrix;
}

export const onSelectMouseMove = (
  e: MouseEvent<HTMLCanvasElement>,
  x: number,
  y: number,
  scale: number,
  operationListState: OperationListState,
  selectedOperation: Operation | null,
  setViewMatrix: (viewMatrix: number[]) => void,
  setHoverOperationId: (id: string | null) => void,
  handleCompleteOperation: (tool?: Tool, data?: Update, pos?: Position) => void,
  operationListDispatch: React.Dispatch<any>,
  setSelectedOperation: (operation: Operation | null) => void,
) => {
  if (isDragging) {
    const items = operationListState.queue;
    const diff = {
      x: (e.clientX - lastSelectX) / scale,
      y: (e.clientY - lastSelectY) / scale,
    };

    if (selectedOperation && startDragPos) {
      const lastOperation = items[items.length - 1];
      if (lastOperation && lastOperation.tool === Tool.Update && (lastOperation as Update).operationId === selectedOperation.id && (lastOperation as Update).data.pos) {
        const update = lastOperation as Update;
        if (update.data.pos) {
          update.data.pos = {
            ...update.data.pos,
            x: startDragPos.x + diff.x,
            y: startDragPos.y + diff.y,
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
            pos: { ...startDragPos, x: startDragPos.x + diff.x, y: startDragPos.y + diff.y, }
          },
        });
      }

      setSelectedOperation({...selectedOperation, pos: { ...startDragPos, x: startDragPos.x + diff.x, y: startDragPos.y + diff.y }});
    } else {
      setViewMatrix(matrix_multiply([1, 0, 0, 1, diff.x, diff.y], startDragViewMatrix));
    }
  } else {
    const pos: [number, number] = [x, y];

    let selectedItem: Operation | null = findSelectedItem(operationListState.reduced, pos, scale);
    setHoverOperationId(selectedItem ? selectedItem.id : selectedItem);
  }
}

export const onSelectMouseDoubleClick = () => {
  
}

export const onSelectMouseUp = () => {
  if (isDragging) {
    isDragging = false;
  }
}
