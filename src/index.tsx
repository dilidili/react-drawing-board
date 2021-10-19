import React, { useState, useRef, CSSProperties, useEffect, useReducer, useMemo } from 'react';
import { v4 } from 'uuid';
import { animated } from 'react-spring';
import { IntlProvider } from 'react-intl';
import { Layout } from 'antd';
import Toolbar from './Toolbar';
import SketchPad, {
  SketchPadRef,
  Operation,
  onChangeCallback,
  onSaveCallback,
  ViewMatrix,
} from './SketchPad';
import Tool, { ToolOption, defaultToolOption, ShapeType } from './enums/Tool';
import EnableSketchPadContext from './contexts/EnableSketchPadContext';
import locales, { localeType } from './locales';
import { extract_scale_from_matrix, isMobileDevice } from './utils';
import './index.less';
import ConfigContext, { DefaultConfig } from './ConfigContext';

const { Header, Sider, Content } = Layout;

interface BlockProps {
  userId?: string;
  locale?: localeType;

  // controlled mode.
  operations?: Operation[];
  onChange?: onChangeCallback;
  onSave?: onSaveCallback;
  viewMatrix?: ViewMatrix;
  onViewMatrixChange?: (viewMatrix: ViewMatrix) => void;

  // optional tools
  showBackgroundTool?: boolean;
  initialBackground?: string;

  style?: CSSProperties;

  clsssName?: string;

  toolbarPlacement?: 'top' | 'left' | 'right';
}

const AnimatedSketchPad = animated(SketchPad);

const defaultProps: Partial<BlockProps> = {
  userId: v4(),
  locale: navigator.language as localeType,
  toolbarPlacement: 'top',
};

const enableSketchPadReducer = (_state: boolean, action: boolean) => {
  return action;
};

const Block: React.FC<BlockProps> = (props) => {
  const {
    userId,
    operations,
    onChange,
    toolbarPlacement,
    clsssName,
    onSave,
    showBackgroundTool,
    initialBackground,
    viewMatrix: viewMatrixProp,
    onViewMatrixChange,
  } = {
    ...defaultProps,
    ...props,
  };

  const [currentTool, setCurrentTool] = useState(Tool.Select);
  const [currentToolOption, setCurrentToolOption] = useState<ToolOption>(defaultToolOption);
  const enableSketchPad = useReducer(enableSketchPadReducer, true);
  const refSketch = useRef<SketchPadRef>(null);

  // control view matrix.
  const [stateViewMatrix, setStateViewMatrix] = useState<ViewMatrix>([1, 0, 0, 1, 0, 0]);
  const viewMatrix = viewMatrixProp || stateViewMatrix;
  const setViewMatrix = (newViewMatrix: ViewMatrix) => {
    if (onViewMatrixChange) {
      onViewMatrixChange(newViewMatrix);
    } else {
      setStateViewMatrix(newViewMatrix);
    }
  };

  const scale = extract_scale_from_matrix(viewMatrix);

  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      const { keyCode } = evt;
      // key 'p'
      if (keyCode === 80) {
        setCurrentTool(Tool.Stroke);
      } else if (keyCode === 82) {
        // key 'r'
        setCurrentTool(Tool.Shape);
        setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Rectangle });
      } else if (keyCode === 79) {
        // key 'o'
        setCurrentTool(Tool.Shape);
        setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Oval });
      } else if (keyCode === 84) {
        // key 't'
        setCurrentTool(Tool.Text);
      }
    };

    addEventListener('keydown', keydownHandler);

    return () => removeEventListener('keydown', keydownHandler);
  }, []);

  const renderWithLayout = (toolbar: React.ReactElement, sketchPad: React.ReactElement) => {
    if (toolbarPlacement === 'left' || isMobileDevice) {
      return (
        <Layout style={{ flexDirection: 'row' }}>
          <Sider width={isMobileDevice ? 40 : 55} theme="light">
            {toolbar}
          </Sider>
          <Content>{sketchPad}</Content>
        </Layout>
      );
    } else if (toolbarPlacement === 'top') {
      return (
        <Layout hasSider={false}>
          <Header>{toolbar}</Header>
          <Content>{sketchPad}</Content>
        </Layout>
      );
    } else if (toolbarPlacement === 'right') {
      return (
        <Layout style={{ flexDirection: 'row' }}>
          <Content>{sketchPad}</Content>
          <Sider width={55} theme="light">
            {toolbar}
          </Sider>
        </Layout>
      );
    } else {
      return null;
    }
  };

  const enableSketchPadContextValue = useMemo(() => {
    return {
      enable: enableSketchPad[0],
      setEnable: enableSketchPad[1],
    };
  }, [...enableSketchPad]);

  const config = useMemo(() => {
    return {
      ...DefaultConfig,
      showBackgroundTool,
    };
  }, [DefaultConfig, showBackgroundTool]);

  const locale = props.locale && locales.messages[props.locale] ? props.locale : 'en-US';

  return (
    <ConfigContext.Provider value={config}>
      <IntlProvider locale={locale} messages={locales.messages[locale]}>
        <EnableSketchPadContext.Provider value={enableSketchPadContextValue}>
          <ConfigContext.Consumer>
            {(config) => (
              <div
                className={`${config.prefixCls}-container ${clsssName || ''}`}
                style={{ width: '100vw', height: '100vh', ...(props.style || {}) }}
              >
                {renderWithLayout(
                  <Toolbar
                    toolbarPlacement={toolbarPlacement}
                    currentTool={currentTool}
                    setCurrentTool={setCurrentTool}
                    currentToolOption={currentToolOption}
                    setCurrentToolOption={setCurrentToolOption}
                    scale={scale}
                    selectImage={(image: string) => {
                      if (image && refSketch.current) {
                        refSketch.current.selectImage(image);
                      }
                    }}
                    selectBackgroundImage={(image: string) => {
                      if (image && refSketch.current) {
                        refSketch.current.selectBackgroundImage(image);
                      }
                    }}
                    removeBackgroundImage={() => {
                      if (refSketch.current) {
                        refSketch.current.removeBackgroundImage();
                      }
                    }}
                    undo={() => {
                      if (refSketch.current) {
                        refSketch.current.undo();
                      }
                    }}
                    redo={() => {
                      if (refSketch.current) {
                        refSketch.current.redo();
                      }
                    }}
                    clear={() => {
                      if (refSketch.current) {
                        refSketch.current.clear();
                      }
                    }}
                    save={() => {
                      if (refSketch.current) {
                        refSketch.current.save(onSave);
                      }
                    }}
                  />,
                  <AnimatedSketchPad
                    ref={refSketch}
                    userId={userId}
                    currentTool={currentTool}
                    setCurrentTool={setCurrentTool}
                    currentToolOption={currentToolOption}
                    viewMatrix={viewMatrix}
                    onViewMatrixChange={setViewMatrix}
                    operations={operations}
                    initialBackground={initialBackground}
                    onChange={onChange}
                  />,
                )}
              </div>
            )}
          </ConfigContext.Consumer>
        </EnableSketchPadContext.Provider>
      </IntlProvider>
    </ConfigContext.Provider>
  );
};

export default Block;
