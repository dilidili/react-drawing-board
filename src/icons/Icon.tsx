import React, { useMemo } from 'react';

interface IIconProps {
  type: 'check' | 'close-circle';
  style?: React.CSSProperties;
}

export default function Icon({ type, style }: IIconProps) {
  const iconText = useMemo(() => (type === 'check' ? '✓' : 'x'), [type]);
  const addtionStyle = useMemo(
    () =>
      type === 'close-circle'
        ? {
            borderRadius: '50%',
            backgroundColor: 'red',
            color: '#fff',
            alignItems: 'flex-end',
          }
        : {},
    [type],
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 15,
        height: 15,
        position: 'absolute',
        fontSize: 12,
        ...addtionStyle,
        ...style,
      }}
    >
      {iconText}
    </div>
  );
}
