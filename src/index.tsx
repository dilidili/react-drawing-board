import React, { useState, useRef, CSSProperties } from 'react';
import { v4 } from 'uuid';
import { animated, useSpring } from 'react-spring';
import Toolbar from './Toolbar';
import SketchPad, { SketchPadRef } from './SketchPad';
import styles from './index.css';
import Tool, { ToolOption, defaultToolOption } from './enums/Tool';

interface BlockProps {
  userId: string;
  style?: CSSProperties;
}

const AnimatedSketchPad = animated(SketchPad);

const Block: React.FC<BlockProps> = (props) => {
  const [currentTool, setCurrentTool] = useState(Tool.Select);
  const [scale, setScale] = useState(1);
  const [currentToolOption, setCurrentToolOption] = useState<ToolOption>(defaultToolOption);
  const refSketch = useRef<SketchPadRef>(null);

  const animatedProps = useSpring<{
    value: number
  }>({ value: scale, });

  return (
    <div className={styles.container} style={{ width: '100vw', height: '100vh', ...(props.style || {}) }}>
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
        userId={props.userId}
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        currentToolOption={currentToolOption}
        scale={animatedProps.value}
        onScaleChange={setScale}
      />
    </div>
  );
}

Block.defaultProps = {
  userId: v4(),
};

export default Block;
