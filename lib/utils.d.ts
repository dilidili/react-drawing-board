import { ViewMatrix } from './SketchPad';
export declare function matrix_invert(M: any): any;
export declare const mapClientToCanvas: (evt: {
    clientX: number;
    clientY: number;
}, canvas: HTMLCanvasElement, viewMatrix: number[]) => [number, number];
export declare const matrix_multiply: ([a1, b1, c1, d1, e1, f1]: number[], [a2, b2, c2, d2, e2, f2]: number[]) => number[];
export declare const extract_scale_from_matrix: (viewMatrix: ViewMatrix) => number;
export declare const detectMobileDevice: () => boolean;
export declare const isMobileDevice: boolean;
