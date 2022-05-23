import React, { useContext } from "react";
import ConfigContext from '../ConfigContext';
import "./Layout.less";

function Layout(props: any) {
  const { prefixCls } = useContext(ConfigContext);

  return <div className={`${prefixCls}-layout`}>{props.children}</div>
}

Layout.Header = function Header(props: any) {
  const { prefixCls } = useContext(ConfigContext);

  return <div className={`${prefixCls}-layout-header`}>{props.children}</div>
}

Layout.Sider = function Sider(props: any) {
  const { prefixCls } = useContext(ConfigContext);

  return <div className={`${prefixCls}-layout-sider`}>{props.children}</div>
}

Layout.Content = function Content(props: any) {
  const { prefixCls } = useContext(ConfigContext);

  return <div className={`${prefixCls}-layout-content`}>{props.children}</div>
}

export { Layout };
