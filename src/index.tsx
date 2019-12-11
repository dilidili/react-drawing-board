import React, { useState } from 'react';
import { v4 } from 'uuid';
import Toolbar from './Toolbar';
import SketchPad from './SketchPad';
import styles from './index.css';
import Tool, { ToolOption, defaultToolOption } from './enums/Tool';

interface BlockProps {
  userId: string;
}

const Block: React.FC<BlockProps> = (props) => {
  const [currentTool, setCurrentTool] = useState(Tool.Select);
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [currentToolOption, setCurrentToolOption] = useState<ToolOption>(defaultToolOption);

  return (
    <div className={styles.container}>
      <Toolbar
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        currentToolOption={currentToolOption}
        setCurrentToolOption={setCurrentToolOption}
        setSelectImage={setSelectImage}
      />
      <SketchPad
        userId={props.userId}
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        currentToolOption={currentToolOption}
        selectImage={selectImage}
        setSelectImage={setSelectImage}
      />
    </div>
  );
}

Block.defaultProps = {
  userId: v4(),
};

export default Block;
