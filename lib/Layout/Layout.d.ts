/// <reference types="react" />
declare function Layout(props: any): JSX.Element;
declare namespace Layout {
    var Header: (props: any) => JSX.Element;
    var Sider: (props: any) => JSX.Element;
    var Content: (props: any) => JSX.Element;
}
export { Layout };
