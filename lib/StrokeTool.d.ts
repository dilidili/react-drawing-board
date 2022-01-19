import Tool, { ToolOption } from './enums/Tool';
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
export declare const drawStroke: (stroke: Stroke, context: CanvasRenderingContext2D, hover: boolean) => void;
export declare function onStrokeMouseDown(x: number, y: number, toolOption: ToolOption): Stroke[];
export declare function onStrokeMouseMove(x: number, y: number, context: CanvasRenderingContext2D): Stroke[];
export declare function onStrokeMouseUp(setCurrentTool: (tool: Tool) => void, handleCompleteOperation: (tool?: Tool, data?: Stroke, pos?: Position) => void, currentTool?: Tool): Stroke[];
export declare const useStrokeDropdown: (config: {
    currentToolOption: ToolOption;
    setCurrentToolOption: (option: ToolOption) => void;
    setCurrentTool: (tool: Tool) => void;
    prefixCls: string;
}) => JSX.Element;
export declare const moveStoke: (prev: Stroke, oldPos: Position, newPos: Position) => {
    x: number;
    y: number;
}[];
export {};
