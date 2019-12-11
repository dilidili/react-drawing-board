import React, { useState, useRef, ChangeEventHandler } from 'react';
import Tool, { ToolOption } from './enums/Tool';
import SelectIcon from './svgs/SelectIcon';
import StrokeIcon from './svgs/StrokeIcon';
import ShapeIcon from './svgs/ShapeIcon';
import TextIcon from './svgs/TextIcon';
import ImageIcon from './svgs/ImageIcon';
import { useStrokeDropdown } from './StrokeTool';
import { useShapeDropdown } from './ShapeTool';
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
}, {
  label: '形状',
  icon: ShapeIcon,
  type: Tool.Shape,
  useDropdown: useShapeDropdown,
}, {
  label: '文本',
  icon: TextIcon,
  type: Tool.Text,
}, {
  label: '图片',
  icon: ImageIcon,
  type: Tool.Image,
}];

export interface ToolbarProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
  currentToolOption: ToolOption;
  setCurrentToolOption: (option: ToolOption) => void;
  setSelectImage: (image: string | null) => void;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { currentTool, setCurrentTool, currentToolOption, setCurrentToolOption, setSelectImage } = props;
  const refFileInput = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        setSelectImage(base64data);
      }
    }
  };

  return (
    <div className={styles.container}>
      {tools.map((tool => {
        const menu = (
          <div
            className={classNames({
              [styles.icon]: true,
              [styles.activeIcon]: currentTool === tool.type,
            })}
            onClick={() => {
              if (tool.type === Tool.Image && refFileInput.current) {
                refFileInput.current.click();
              } else {
                setCurrentTool(tool.type)
              }
            }}
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

      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/jpeg, image/png"
        ref={refFileInput}
        onChange={handleFileChange}
      />
    </div>
  )
} 

export default Toolbar;