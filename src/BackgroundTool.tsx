import React from 'react';
import { Menu } from 'antd';
import { useIntl } from 'react-intl';
import { Position } from './enums/Tool';

export const useBackgroundDropdown = (config: {
  selectBackgroundImage: () => void;
  removeBackgroundImage: () => void;
}) => {
  const { selectBackgroundImage, removeBackgroundImage } = config;
  const { formatMessage } = useIntl();

  return (
    <Menu>
      <Menu.Item onClick={() => selectBackgroundImage()}>
        {formatMessage({ id: 'umi.block.sketch.bg.select' })}
      </Menu.Item>
      {/* <Menu.SubMenu disabled title={formatMessage({ id: 'umi.block.sketch.bg.layout' })}>
        <Menu.Item>{formatMessage({ id: 'umi.block.sketch.bg.fill' })}</Menu.Item>
        <Menu.Item>{formatMessage({ id: 'umi.block.sketch.bg.contain' })}</Menu.Item>
        <Menu.Item>{formatMessage({ id: 'umi.block.sketch.bg.not-resize' })}</Menu.Item>
      </Menu.SubMenu> */}
      <Menu.Item onClick={() => removeBackgroundImage()}>
        {formatMessage({ id: 'umi.block.sketch.bg.remove' })}
      </Menu.Item>
    </Menu>
  );
};

export const getBackgroundPosition: (context: CanvasRenderingContext2D) => Position = (context) => {
  return {
    x: 0,
    y: 0,
    w: context.canvas.width,
    h: context.canvas.height,
  };
};
