import Tool, { ToolOption, ShapeType } from './enums/Tool';
import './ShapeTool.less';
export interface Position {
    x: number;
    y: number;
    w: number;
    h: number;
}
export declare type Shape = {
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
export declare const onShapeMouseDown: (x: number, y: number, toolOption: ToolOption) => Shape[];
export declare const onShapeMouseUp: (x: number, y: number, setCurrentTool: (tool: Tool) => void, handleCompleteOperation: (tool?: Tool, data?: Shape, pos?: Position) => void) => Shape[];
export declare const onShapeMouseMove: (x: number, y: number, context: CanvasRenderingContext2D) => void;
export declare const drawRectangle: (rect: Shape, context: CanvasRenderingContext2D, hover: boolean) => any;
export declare const useShapeDropdown: (config: {
    currentToolOption: ToolOption;
    setCurrentToolOption: (option: ToolOption) => void;
    setCurrentTool: (tool: Tool) => void;
    prefixCls: string;
}) => JSX.Element;
