import Tool, { ToolOption, Position } from './enums/Tool';
import { RefObject, MouseEvent } from 'react';
import { mapClientToCanvas } from './utils';

let currentText = '';

export interface Text {
  tool: Tool,
  color: string,
  text: string,
}

export const onTextMouseDown = (e: MouseEvent<HTMLCanvasElement>, x: number, y: number, toolOption: ToolOption, refInput: RefObject<HTMLDivElement>, refCanvas: RefObject<HTMLCanvasElement>) => {
  if (!currentText && refInput.current && refCanvas.current) {
    const textarea = refInput.current;
    const canvas = refCanvas.current;

    const { top, left } = canvas.getBoundingClientRect();

    let x = e.clientX - left;
    let y = e.clientY - top;

    textarea.style.display = 'block';
    textarea.style.left = x + canvas.offsetLeft + 'px';
    textarea.style.top = y + canvas.offsetTop + 'px';
    textarea.style.color = toolOption.textColor;
    textarea.innerText = '输入文本';

    setTimeout(() => {
      if (getSelection && Range) {
        var selection = getSelection();
        selection.removeAllRanges();
        var range = new Range();
        range.selectNodeContents(textarea);
        selection.addRange(range);
      }
    }, 0);

    currentText = '输入文本';
  }
}

export const onTextComplete = (refInput: RefObject<HTMLDivElement>, refCanvas: RefObject<HTMLCanvasElement>, viewMatrix: number[], handleCompleteOperation: (tool?: Tool, data?: Text, pos?: Position) => void, setCurrentTool: (tool: Tool) => void) => {
  if (currentText && refInput.current && refCanvas.current) {
    const textarea = refInput.current;
    const color = textarea.style.color as string;
    const text = textarea.innerText;
    let { top, left, width, height } = textarea.getBoundingClientRect();

    const currentPos = mapClientToCanvas({
      clientX: left,
      clientY: top,
    } as MouseEvent<HTMLCanvasElement>, refCanvas.current, viewMatrix);

    textarea.style.display = 'none';

    const pos: Position = {
      x: currentPos[0],
      y: currentPos[1],
      w: width,
      h: height,
    };

    handleCompleteOperation(Tool.Text, { tool: Tool.Text, text, color }, pos);
    setCurrentTool(Tool.Select);
    currentText = '';
  }
}

export const drawText = (item: Text, context: CanvasRenderingContext2D, pos: Position) => {
  context.globalCompositeOperation = 'source-over';
  context.font = `${12}px "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif, "localant"`;
  context.fillStyle = item.color || '#4a4a4a';

  const lines = item.text.split('\n');
  for (var i = 0; i < lines.length; i++) {
    context.fillText(lines[i], pos.x, 13 + pos.y + (i * 17));
  }
}