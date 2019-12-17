import React from 'react';
import Tool, { ToolOption, Position, TextSize, strokeColor } from './enums/Tool';
import { RefObject, MouseEvent } from 'react';
import { mapClientToCanvas } from './utils';
import { Icon } from 'antd';
import styles from './TextTool.less'

let currentText = '';
let currentColor = '';
let currentSize = TextSize.Default;

const textSize = [TextSize.Small, TextSize.Default, TextSize.Large];

export interface Text {
  size: TextSize,
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
    textarea.style.fontSize = (toolOption.textSize as number) + 'px';
    textarea.style.lineHeight = (toolOption.textSize as number) + 'px';
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
    currentColor = toolOption.textColor;
    currentSize = toolOption.textSize;
  }
}

export const onTextComplete = (refInput: RefObject<HTMLDivElement>, refCanvas: RefObject<HTMLCanvasElement>, viewMatrix: number[], scale: number, handleCompleteOperation: (tool?: Tool, data?: Text, pos?: Position) => void, setCurrentTool: (tool: Tool) => void) => {
  if (currentText && refInput.current && refCanvas.current) {
    const textarea = refInput.current;
    const text = textarea.innerText;
    let { top, left, width, height } = textarea.getBoundingClientRect();
    width = 1 / scale * width;
    height = 1 / scale * height;

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

    handleCompleteOperation(Tool.Text, { text, color: currentColor, size: currentSize }, pos);
    setCurrentTool(Tool.Select);
    currentText = '';
  }
}

export const font = `"PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif, "localant"`;

export const drawText = (item: Text, context: CanvasRenderingContext2D, pos: Position) => {
  context.globalCompositeOperation = 'source-over';
  context.font = `${item.size}px ${font}`;
  context.fillStyle = item.color || '#4a4a4a';
  context.textBaseline = 'top';

  const lines = item.text.split('\n');
  for (var i = 0; i < lines.length; i++) {
    context.fillText(lines[i], pos.x, pos.y + (i * item.size));
  }
}

export const useTextDropdown = (currentToolOption: ToolOption, setCurrentToolOption: (option: ToolOption) => void, setCurrentTool?: (tool: Tool) => void) => {
  return (
    <div className={styles.strokeMenu}>
      <div className={styles.colorAndSize}>
        <div className={styles.textSizeSelector}>
          {textSize.map(size => {
            return (
              <div
                key={size}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setCurrentToolOption({ ...currentToolOption, textSize: size });
                  setCurrentTool && setCurrentTool(Tool.Stroke);
                }}
                style={{ color: size === currentToolOption.textSize ? '#666' : '#ccc' }}
              >
                {size === TextSize.Small ? 'Small' : size === TextSize.Default ? 'Default' : 'Large'}
              </div>
            )
          })}
        </div>
        <div className={styles.split}></div>
        <div className={styles.palatte}>
          {strokeColor.map(color => {
            return <div className={styles.color} key={color} onClick={(evt) => {
              evt.stopPropagation();
              setCurrentToolOption({ ...currentToolOption, textColor: color });
              setCurrentTool && setCurrentTool(Tool.Stroke);
            }}>
              <div className={styles.fill} style={{ background: color }}></div>
              {currentToolOption.textColor === color ? <Icon type="check" style={color === '#ffffff' ? { color: '#979797' } : {}} /> : null}
            </div>
          })}
        </div>
      </div>
    </div>
  )
}