import React, { CSSProperties, MouseEventHandler, useState } from "react";

type Props = {
  overlay: JSX.Element;
  children: JSX.Element | Array<JSX.Element>;
  forceVisible?: boolean;
};

function Dropdown(props: Props) {
  const { children, overlay, forceVisible } = props;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // This code will prevent accidentally drawing under the dropdown when you are
  // selecting an item from the tool options
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

  const wrapperStyle: CSSProperties = { position: 'relative' };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      {children}
      {isDropdownVisible || forceVisible ? settingMenu : null}
    </div>
  );
}

export { Dropdown };
