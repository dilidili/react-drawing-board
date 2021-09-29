import React from 'react';
import { Menu } from 'antd';
import { useIntl } from 'react-intl';
import Tool, { ToolOption } from './enums/Tool';

export const useBackgroundDropdown = (config: {
  selectBackgroundImage: (image: string) => void;
}) => {
  const { formatMessage } = useIntl();

  return (
    <Menu>
      <Menu.Item>{formatMessage({ id: 'umi.block.sketch.bg.select' })}</Menu.Item>
      <Menu.SubMenu title={formatMessage({ id: 'umi.block.sketch.bg.layout' })}>
        <Menu.Item>{formatMessage({ id: 'umi.block.sketch.bg.fill' })}</Menu.Item>
        <Menu.Item>{formatMessage({ id: 'umi.block.sketch.bg.contain' })}</Menu.Item>
        <Menu.Item>{formatMessage({ id: 'umi.block.sketch.bg.not-resize' })}</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item>{formatMessage({ id: 'umi.block.sketch.bg.remove' })}</Menu.Item>
    </Menu>
  );
};
