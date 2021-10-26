import React from "react";

function Menu(props: any) {
  return <div>{props.children}</div>;
}

Menu.Item = function Item(props: any) {
  return <div onClick={props.onClick}>{props.children}</div>
}

export { Menu };
