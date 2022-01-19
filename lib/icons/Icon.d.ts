import React from 'react';
interface IIconProps {
    type: 'check' | 'close-circle';
    style?: React.CSSProperties;
}
export default function Icon({ type, style }: IIconProps): JSX.Element;
export {};
