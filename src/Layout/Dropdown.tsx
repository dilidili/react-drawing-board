import React, { useState } from "react";
import { ToolConfig } from "../enums/Tool";

type Props = {
  tool: any;
  key: any;
  overlay: any;
  trigger: any;
  isCurrent: any;
  children: any;
};

function Dropdown(props: any) {
  console.log('DROPDOWN', props);
  const { children, overlay, isCurrent } = props;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const stopPropagation: any = (e: any) => e.stopPropagation();

  const menuStyle: any = {
    position: 'absolute',
    top: 56,
  };

  const settingMenu = (
    <div style={menuStyle} onMouseDown={stopPropagation}>
      {overlay}
    </div>
  );

  const wrapperStyle: any = {position: 'relative'};

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      {children}
      {isDropdownVisible ? settingMenu : null}
    </div>

  );
}

export { Dropdown };
