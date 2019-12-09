import React, { useState } from 'react';
import Tool, { ToolOption } from './enums/Tool';
import SelectIcon from './svgs/SelectIcon';
import StrokeIcon from './svgs/StrokeIcon';
import { useStrokeDropdown } from './StrokeTool';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './Toolbar.less';

const tools = [{
  label: '选择',
  icon: SelectIcon,
  type: Tool.Select,
}, {
  label: '笔触',
  icon: StrokeIcon,
  type: Tool.Stroke,
  useDropdown: useStrokeDropdown,
}];

export interface ToolbarProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
  currentToolOption: ToolOption;
  setCurrentToolOption: (option: ToolOption) => void;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { currentTool, setCurrentTool, currentToolOption, setCurrentToolOption } = props;

  return (
    <div className={styles.container}>
      {tools.map((tool => {
        const menu = (
          <div
            className={classNames({
              [styles.icon]: true,
              [styles.activeIcon]: currentTool === tool.type,
            })}
            onClick={() => setCurrentTool(tool.type)}
            key={tool.label}
          >
            <tool.icon />
            <label className={styles.iconLabel}>{tool.label}</label>
          </div>
        )

        if (tool.useDropdown) {
          const overlay = tool.useDropdown(currentToolOption, setCurrentToolOption, setCurrentTool);

          return (
            <Dropdown key={tool.label} overlay={overlay} placement="bottomLeft" trigger={['hover']}>
              {menu}
            </Dropdown>
          )
        } else {
          return menu;
        }
      }))}
    </div>
  )
} 

export default Toolbar;