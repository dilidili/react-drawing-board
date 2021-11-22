enum Tool {
  Select = 'Select',
  Stroke = 'Stroke',
  Shape = 'Shape',
  Text = 'Text',
  Image = 'Image',
  Undo = 'Undo',
  Redo = 'Redo',
  Clear = 'Clear',
  Eraser = 'Eraser',
  Zoom = 'Zoom',
  Save = 'Save',
  Update = 'Update',
  LazyUpdate = 'LazyUpdate',
  Remove = 'Remove',
  Background = 'Background',
  RemoveBackground = 'RemoveBackground',
}

export enum ShapeType {
  Rectangle = 'Rectangle',
  Oval = 'Oval',
}

export const MAX_SCALE = 2;

export const MIN_SCALE = 0.1;

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const strokeSize = [2, 4, 6];

export const strokeColor = [
  '#4a4a4a',
  '#f55b6c',
  '#f7c924',
  '#63d321',
  '#50e3c2',
  '#59b9ff',
  '#bd10e0',
  '#ffffff',
];

export enum TextSize {
  Small = 12,
  Default = 20,
  Large = 28,
}

export const defaultToolOption = {
  strokeSize: strokeSize[1],
  strokeColor: strokeColor[0],
  shapeType: ShapeType.Rectangle,
  shapeBorderColor: strokeColor[0],
  shapeBorderSize: 4,
  textColor: strokeColor[0],
  textSize: TextSize.Default,
  defaultText: {
    id: 'umi.block.sketch.text.placeholder',
  },
};

export type ToolOption = {
  strokeSize: number;
  strokeColor: string;
  shapeType: ShapeType;
  shapeBorderColor: string;
  shapeBorderSize: number;
  textColor: string;
  textSize: TextSize;

  defaultText:
    | string
    | {
        id: string;
      };
};

export default Tool;
