import React, { useState } from 'react';
import Tool from './enums/Tool';
import SelectIcon from './svgs/SelectIcon';
import StrokeIcon from './svgs/StrokeIcon';
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
}];

export interface ToolbarProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { currentTool, setCurrentTool } = props;

  return (
    <div className={styles.container}>
      {tools.map((tool => {
        return (
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
      }))}
    </div>
  )
} 

export default Toolbar;