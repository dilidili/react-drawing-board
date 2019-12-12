import React, { useState, useRef, ChangeEventHandler } from 'react';
import Tool, { ToolOption } from './enums/Tool';
import SelectIcon from './svgs/SelectIcon';
import StrokeIcon from './svgs/StrokeIcon';
import ShapeIcon from './svgs/ShapeIcon';
import TextIcon from './svgs/TextIcon';
import ImageIcon from './svgs/ImageIcon';
import UndoIcon from './svgs/UndoIcon';
import RedoIcon from './svgs/RedoIcon';
import ClearIcon from './svgs/ClearIcon';
import ZoomIcon from './svgs/ZoomIcon';
import SaveIcon from './svgs/SaveIcon';
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
}, {
  label: '撤销',
  icon: UndoIcon,
  type: Tool.Undo,
  style: {
    marginLeft: 'auto',
  },
}, {
  label: '重做',
  icon: RedoIcon,
  type: Tool.Redo,
}, {
  label: '清空',
  icon: ClearIcon,
  type: Tool.Clear,
  style: {
    marginRight: 'auto',
  },
}, {
  label: '100%',
  labelThunk: (props: ToolbarProps) => `${~~(props.scale * 100)}%`,
  icon: ZoomIcon,
  type: Tool.Zoom,
}, {
  label: '保存',
  icon: SaveIcon,
  type: Tool.Save,
}];

export interface ToolbarProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
  currentToolOption: ToolOption;
  setCurrentToolOption: (option: ToolOption) => void;
  selectImage: (image: string) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  save: () => void;
  scale: number;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { currentTool, setCurrentTool, currentToolOption, setCurrentToolOption, selectImage, undo, redo, clear, save } = props;
  const refFileInput = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        selectImage(base64data);
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
            style={tool.style || {}}
            onClick={() => {
              if (tool.type === Tool.Image && refFileInput.current) {
                refFileInput.current.click();
              } else if (tool.type === Tool.Undo) {
                undo();
              } else if (tool.type === Tool.Redo) {
                redo();
              } else if (tool.type === Tool.Clear) {
                clear();
              } else if (tool.type === Tool.Zoom) {
              } else if (tool.type === Tool.Save) {
                save();
              } else {
                setCurrentTool(tool.type);
              }
            }}
            key={tool.label}
          >
            <tool.icon />
            <label className={styles.iconLabel}>{tool.labelThunk ? tool.labelThunk(props) : tool.label}</label>
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