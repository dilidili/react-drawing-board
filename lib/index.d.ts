import React, { CSSProperties } from 'react';
import { Operation, onChangeCallback, onSaveCallback, ViewMatrix } from './SketchPad';
import { localeType } from './locales';
import './index.less';
interface BlockProps {
    userId?: string;
    locale?: localeType;
    operations?: Operation[];
    onChange?: onChangeCallback;
    onSave?: onSaveCallback;
    viewMatrix?: ViewMatrix;
    onViewMatrixChange?: (viewMatrix: ViewMatrix) => void;
    showBackgroundTool?: boolean;
    initialBackground?: string;
    style?: CSSProperties;
    clsssName?: string;
    toolbarPlacement?: 'top' | 'left' | 'right';
}
declare const Block: React.FC<BlockProps>;
export default Block;
