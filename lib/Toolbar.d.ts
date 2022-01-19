import React from 'react';
import Tool, { ToolOption } from './enums/Tool';
import './Toolbar.less';
interface ToolbarProps {
    currentTool: Tool;
    setCurrentTool: (tool: Tool) => void;
    currentToolOption: ToolOption;
    setCurrentToolOption: (option: ToolOption) => void;
    selectImage: (image: string) => void;
    selectBackgroundImage: (image: string) => void;
    removeBackgroundImage: () => void;
    undo: () => void;
    redo: () => void;
    clear: () => void;
    save: () => void;
    scale: number;
    toolbarPlacement: string;
}
declare const Toolbar: React.FC<ToolbarProps>;
export default Toolbar;
