import React, { useState } from "react";
import { ToolConfig } from "../enums/Tool";

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

  const stopPropagation: any = (e) => e.stopPropagation();

  const menuStyle: any = {
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
}

export { Dropdown };
