declare enum Tool {
    Select = "Select",
    Stroke = "Stroke",
    Shape = "Shape",
    Text = "Text",
    Image = "Image",
    Undo = "Undo",
    Redo = "Redo",
    Clear = "Clear",
    Eraser = "Eraser",
    Zoom = "Zoom",
    Save = "Save",
    Update = "Update",
    LazyUpdate = "LazyUpdate",
    Remove = "Remove",
    Background = "Background",
    RemoveBackground = "RemoveBackground"
}
export declare enum ShapeType {
    Rectangle = "Rectangle",
    Oval = "Oval"
}
export declare const MAX_SCALE = 2;
export declare const MIN_SCALE = 0.1;
export interface Position {
    x: number;
    y: number;
    w: number;
    h: number;
}
export declare const strokeSize: number[];
export declare const strokeColor: string[];
export declare enum TextSize {
    Small = 12,
    Default = 20,
    Large = 28
}
export declare const defaultToolOption: {
    strokeSize: number;
    strokeColor: string;
    shapeType: ShapeType;
    shapeBorderColor: string;
    shapeBorderSize: number;
    textColor: string;
    textSize: TextSize;
    defaultText: {
        id: string;
    };
};
export declare type ToolOption = {
    strokeSize: number;
    strokeColor: string;
    shapeType: ShapeType;
    shapeBorderColor: string;
    shapeBorderSize: number;
    textColor: string;
    textSize: TextSize;
    defaultText: string | {
        id: string;
    };
};
export default Tool;
