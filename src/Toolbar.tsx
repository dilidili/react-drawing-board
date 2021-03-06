import React, { useRef, ChangeEventHandler, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { useIntl } from 'react-intl';
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
import EraserIcon from './svgs/EraserIcon';
import { useStrokeDropdown } from './StrokeTool';
import { useShapeDropdown } from './ShapeTool';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import './Toolbar.less';
import { isMobileDevice } from './utils';
import ConfigContext from './ConfigContext';
import EnableSketchPadContext from './contexts/EnableSketchPadContext';

const tools = [
  {
    label: 'umi.block.sketch.select',
    icon: SelectIcon,
    type: Tool.Select,
  },
  {
    label: 'umi.block.sketch.pencil',
    icon: StrokeIcon,
    type: Tool.Stroke,
    useDropdown: useStrokeDropdown,
  },
  {
    label: 'umi.block.sketch.shape',
    icon: ShapeIcon,
    type: Tool.Shape,
    useDropdown: useShapeDropdown,
  },
  {
    label: 'umi.block.sketch.text',
    icon: TextIcon,
    type: Tool.Text,
  },
  {
    label: 'umi.block.sketch.image',
    icon: ImageIcon,
    type: Tool.Image,
  },
  {
    label: 'umi.block.sketch.undo',
    icon: UndoIcon,
    type: Tool.Undo,
    style: {
      marginLeft: 'auto',
    },
  },
  {
    label: 'umi.block.sketch.redo',
    icon: RedoIcon,
    type: Tool.Redo,
  },
  {
    label: 'umi.block.sketch.eraser',
    icon: EraserIcon,
    type: Tool.Eraser,
  },
  {
    label: 'umi.block.sketch.clear',
    icon: ClearIcon,
    type: Tool.Clear,
    style: {
      marginRight: 'auto',
    },
  },
  ...(!isMobileDevice
    ? [
        {
          label: '100%',
          labelThunk: (props: ToolbarProps) => `${~~(props.scale * 100)}%`,
          icon: ZoomIcon,
          type: Tool.Zoom,
        },
      ]
    : []),
  ...(!isMobileDevice
    ? [
        {
          label: 'umi.block.sketch.save',
          icon: SaveIcon,
          type: Tool.Save,
        },
      ]
    : []),
];

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
  toolbarPlacement: string;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const {
    currentTool,
    setCurrentTool,
    currentToolOption,
    setCurrentToolOption,
    selectImage,
    undo,
    redo,
    clear,
    save,
    toolbarPlacement,
  } = props;
  const refFileInput = useRef<HTMLInputElement>(null);
  const { formatMessage } = useIntl();
  const { prefixCls } = useContext(ConfigContext);
  const enableSketchPadContext = useContext(EnableSketchPadContext);

  const toolbarPrefixCls = prefixCls + '-toolbar';

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        selectImage(base64data as string);
      };
    }
  };

  return (
    <div
      className={classNames({
        [`${toolbarPrefixCls}-container`]: true,
        [`${toolbarPrefixCls}-mobile-container`]: isMobileDevice,
      })}
    >
      {tools.map((tool) => {
        let borderTopStyle = 'none';
        if (isMobileDevice) {
          if (tool.type === Tool.Stroke && currentToolOption.strokeColor) {
            borderTopStyle = `3px solid ${currentToolOption.strokeColor}`;
          }

          if (tool.type === Tool.Shape && currentToolOption.shapeBorderColor) {
            borderTopStyle = `3px solid ${currentToolOption.shapeBorderColor}`;
          }
        }

        const iconAnimateProps = useSpring({
          left: isMobileDevice && currentTool !== tool.type ? -12 : 0,
          borderTop: borderTopStyle,
          ...(tool.style || {}),
        });

        const menu = (
          <animated.div
            className={classNames({
              [`${toolbarPrefixCls}-icon`]: true,
              [`${toolbarPrefixCls}-activeIcon`]: currentTool === tool.type && !isMobileDevice,
              [`${toolbarPrefixCls}-mobile-icon`]: isMobileDevice,
            })}
            style={iconAnimateProps}
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
            {!isMobileDevice ? (
              <label className={`${toolbarPrefixCls}-iconLabel`}>
                {tool.labelThunk ? tool.labelThunk(props) : formatMessage({ id: tool.label })}
              </label>
            ) : null}
          </animated.div>
        );

        if (tool.useDropdown) {
          const overlay = tool.useDropdown(
            currentToolOption,
            setCurrentToolOption,
            setCurrentTool,
            prefixCls,
          );

          return (
            <Dropdown
              key={tool.label}
              overlay={overlay}
              placement={
                toolbarPlacement === 'top' || toolbarPlacement === 'left'
                  ? 'bottomLeft'
                  : 'bottomRight'
              }
              trigger={[isMobileDevice ? 'click' : 'hover']}
              onVisibleChange={(visible) => {
                enableSketchPadContext.setEnable(!visible);
              }}
            >
              {menu}
            </Dropdown>
          );
        } else {
          return menu;
        }
      })}

      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/jpeg, image/png"
        ref={refFileInput}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Toolbar;
