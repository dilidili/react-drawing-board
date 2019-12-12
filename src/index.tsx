import React, { useState, useRef, CSSProperties } from 'react';
import { v4 } from 'uuid';
import Toolbar from './Toolbar';
import SketchPad, { SketchPadRef } from './SketchPad';
import styles from './index.css';
import Tool, { ToolOption, defaultToolOption } from './enums/Tool';

interface BlockProps {
  userId: string;
  style?: CSSProperties;
}

const Block: React.FC<BlockProps> = (props) => {
  const [currentTool, setCurrentTool] = useState(Tool.Select);
  const [scale, setScale] = useState(1);
  const [currentToolOption, setCurrentToolOption] = useState<ToolOption>(defaultToolOption);
  const refSketch = useRef<SketchPadRef>(null);

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
      />
      <SketchPad
        ref={refSketch}
        userId={props.userId}
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        currentToolOption={currentToolOption}
        scale={scale}
        onScaleChange={setScale}
      />
    </div>
  );
}

Block.defaultProps = {
  userId: v4(),
};

export default Block;
