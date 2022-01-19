import Tool, { Position } from './enums/Tool';
export declare type Image = {
    imageData: string;
};
export declare type Background = {
    imageData: string;
};
export declare const drawImage: (item: Image, context: CanvasRenderingContext2D, pos: Position, id: string, rerender: () => void) => void;
export declare const drawBackgroundImage: (item: Image, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, viewMatrix: number[], id: string, rerender: () => void) => void;
export declare const onImageComplete: (data: string, canvas: HTMLCanvasElement, viewMatrix: number[], handleCompleteOperation: (tool?: Tool, data?: Image, pos?: Position) => void) => void;
export declare const onBackgroundImageComplete: (data: string, canvas: HTMLCanvasElement, viewMatrix: number[], handleCompleteOperation: (tool?: Tool, data?: Image, pos?: Position) => void) => void;
