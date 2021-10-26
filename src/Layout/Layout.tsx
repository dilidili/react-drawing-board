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

export { Layout };
