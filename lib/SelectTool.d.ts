import { RefObject } from 'react';
import Tool, { Position } from './enums/Tool';
import { Operation, Update, OperationListState, Remove } from './SketchPad';
import { IntlShape } from 'react-intl';
export declare const SELECT_PADDING = 10;
export declare const onSelectMouseDown: (e: {
    clientX: number;
    clientY: number;
}, x: number, y: number, scale: number, operationListState: OperationListState, viewMatrix: number[], setSelectedOperation: (item: Operation | null) => void) => void;
export declare const onSelectMouseMove: (e: {
    clientX: number;
    clientY: number;
}, x: number, y: number, scale: number, operationListState: OperationListState, selectedOperation: Operation | null, setViewMatrix: (viewMatrix: number[]) => void, setHoverOperationId: (id: any) => void, handleCompleteOperation: (tool?: Tool, data?: Update, pos?: Position) => void, operationListDispatch: React.Dispatch<any>, setSelectedOperation: (operation: Operation | null) => void) => void;
export declare const onSelectMouseDoubleClick: (x: number, y: number, scale: number, operationListState: OperationListState, handleCompleteOperation: (tool?: Tool, data?: Remove, pos?: Position) => void, viewMatrix: number[], refInput: RefObject<HTMLDivElement>, refCanvas: RefObject<HTMLCanvasElement>, intl: IntlShape) => void;
export declare const onSelectMouseUp: (operationListDispatch: React.Dispatch<any>) => void;
