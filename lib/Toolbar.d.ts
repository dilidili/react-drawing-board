import React from 'react';
import Tool, { ToolOption } from './enums/Tool';
import './Toolbar.less';
import { ViewMatrix } from './SketchPad';
interface ToolbarProps {
    currentTool: Tool;
    setCurrentTool: (tool: Tool) => void;
    currentToolOption: ToolOption;
    setCurrentToolOption: (option: ToolOption) => void;
    selectImage: (image: string) => void;
    selectBackgroundImage: (image: string) => void;
    removeBackgroundImage: () => void;
    setViewMatrix: (matrix: ViewMatrix) => void;
    viewMatrix: ViewMatrix;
    undo: () => void;
    redo: () => void;
    clear: () => void;
    save: () => void;
    scale: number;
    toolbarPlacement: string;
    getCanvas?: () => HTMLCanvasElement;
}
declare const Toolbar: React.FC<ToolbarProps>;
export default Toolbar;
