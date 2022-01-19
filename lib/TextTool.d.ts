import Tool, { ToolOption, Position, TextSize } from './enums/Tool';
import { IntlShape } from 'react-intl';
import { RefObject } from 'react';
import './TextTool.less';
export interface Text {
    size: TextSize;
    color: string;
    text: string;
}
export declare const onTextMouseDown: (e: {
    clientX: number;
    clientY: number;
}, toolOption: ToolOption, scale: number, refInput: RefObject<HTMLDivElement>, refCanvas: RefObject<HTMLCanvasElement>, intl: IntlShape) => void;
export declare const onTextComplete: (refInput: RefObject<HTMLDivElement>, refCanvas: RefObject<HTMLCanvasElement>, viewMatrix: number[], scale: number, handleCompleteOperation: (tool?: Tool, data?: Text, pos?: Position) => void, setCurrentTool: (tool: Tool) => void) => void;
export declare const font = "\"PingFang SC\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Helvetica, \"Hiragino Sans GB\", \"Microsoft YaHei\", SimSun, sans-serif, \"localant\"";
export declare const drawText: (item: Text, context: CanvasRenderingContext2D, pos: Position) => void;
export declare const useTextDropdown: (currentToolOption: ToolOption, setCurrentToolOption: (option: ToolOption) => void, setCurrentTool: (tool: Tool) => void, intl: IntlShape, prefixCls: string) => JSX.Element;
