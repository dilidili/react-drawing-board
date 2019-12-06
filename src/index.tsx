import React, { useState } from 'react';
import Toolbar from './Toolbar';
import SketchPad from './SketchPad';
import styles from './index.css';
import Tool from './enums/Tool';

const Block: React.FC = () => {
  const [currentTool, setCurrentTool] = useState(Tool.Select);

  return (
    <div className={styles.container}>
      <Toolbar
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
      />
      <SketchPad
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
      />
    </div>
  );
}

export default Block;
