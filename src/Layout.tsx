import React from "react";

function Layout(props: any) {
  return <div>{props.children}</div>
}

Layout.Header = function Header(props: any) {
  return <div>{props.children}</div>
}

Layout.Sider = function Sider(props: any) {
  return <div>{props.children}</div>
}

Layout.Content = function Content(props: any) {
  return <div>{props.children}</div>
}

function Dropdown(props: any) {
  return <div>{props.children}</div>;
}

function Menu(props: any) {
  return <div>{props.children}</div>;
}

Menu.Item = function Item(props: any) {
  return <div onClick={props.onClick}>{props.children}</div>
}

export { Layout, Dropdown, Menu };
