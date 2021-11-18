import React, { CSSProperties, MouseEventHandler, useState } from "react";
import Tool, { ToolConfig } from "../enums/Tool";

type Props = {
  tool: ToolConfig;
  key: string;
  overlay: JSX.Element;
  trigger: 'click' | 'hover';
  isCurrent: boolean;
  children: React.Component | Array<React.Component>;
};

function Dropdown(props: Props) {
  console.log('DROPDOWN', props);
  const { children, overlay, isCurrent } = props;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const stopPropagation: MouseEventHandler = (e) => e.stopPropagation();

  const menuStyle: CSSProperties = {
    position: 'absolute',
    top: 56,
  };

  const settingMenu = (
    <div style={menuStyle} onMouseDown={stopPropagation}>
      {overlay}
    </div>
  );

  return (
    <div
      style={{position: 'relative'}}
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      {children}
      {isDropdownVisible ? settingMenu : null}
    </div>

  );
  // if (!visible) return null;
  // return <div onClick={onVisibleChange}>{overlay}</div>;
}

export { Dropdown };
