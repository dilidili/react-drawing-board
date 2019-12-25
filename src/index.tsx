import React, { useState, useRef, CSSProperties, useEffect } from 'react';
import { v4 } from 'uuid';
import { animated, useSpring } from 'react-spring';
import { IntlProvider } from 'react-intl';
import Toolbar from './Toolbar';
import SketchPad, { SketchPadRef, Operation, onChangeCallback } from './SketchPad';
import Tool, { ToolOption, defaultToolOption, ShapeType } from './enums/Tool';
import locales, { localeType } from './locales';
import './index.less';
import ConfigContext, { DefaultConfig } from './ConfigContext';

interface BlockProps {
  userId?: string;
  locale?: localeType;

  // controlled mode
  operations?: Operation[];
  onChange?: onChangeCallback;

  style?: CSSProperties;
}

const AnimatedSketchPad = animated(SketchPad);

const defaultProps = {
  userId: v4(),
  locale: navigator.language as localeType,
};

const Block: React.FC<BlockProps> = (props) => {
  const { locale, userId, operations, onChange, } = { ...defaultProps, ...props };

  const [currentTool, setCurrentTool] = useState(Tool.Select);
  const [scale, setScale] = useState(1);
  const [currentToolOption, setCurrentToolOption] = useState<ToolOption>(defaultToolOption);
  const refSketch = useRef<SketchPadRef>(null);

  const animatedProps = useSpring<{
    value: number
  }>({ value: scale, });

  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      const { keyCode } = evt;
      // key 'p'
      if (keyCode === 80) {
        setCurrentTool(Tool.Stroke);
      } else if (keyCode === 82) { // key 'r'
        setCurrentTool(Tool.Shape);
        setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Rectangle });
      } else if (keyCode === 79) { // key 'o'
        setCurrentTool(Tool.Shape);
        setCurrentToolOption({ ...currentToolOption, shapeType: ShapeType.Oval });
      } else if (keyCode === 84) { // key 't'
        setCurrentTool(Tool.Text);
      } 
    };

    addEventListener('keydown', keydownHandler);

    return () => removeEventListener('keydown', keydownHandler);
  }, []);

  return (
    <ConfigContext.Provider value={DefaultConfig}>
      <IntlProvider locale={locale} messages={locales.messages[locale]}>
        <ConfigContext.Consumer>
          {config => (
            <div className={`${config.prefixCls}-container`} style={{ width: '100vw', height: '100vh', ...(props.style || {}) }}>
              <Toolbar
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
                    refSketch.current.save();
                  }
                }}
              />
              <AnimatedSketchPad
                ref={refSketch}
                userId={userId}
                currentTool={currentTool}
                setCurrentTool={setCurrentTool}
                currentToolOption={currentToolOption}
                scale={animatedProps.value}
                onScaleChange={setScale}
                operations={operations}
                onChange={onChange}
              />
            </div>
          )}
        </ConfigContext.Consumer>
      </IntlProvider>
    </ConfigContext.Provider>
  );
}

export default Block;
