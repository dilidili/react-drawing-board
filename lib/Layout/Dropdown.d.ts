/// <reference types="react" />
declare type Props = {
    overlay: JSX.Element;
    children: JSX.Element | Array<JSX.Element>;
    forceVisible?: boolean;
    forceHide?: boolean;
};
declare function Dropdown(props: Props): JSX.Element;
export { Dropdown };
