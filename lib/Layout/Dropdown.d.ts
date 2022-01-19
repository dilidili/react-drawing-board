/// <reference types="react" />
declare type Props = {
    key: string;
    overlay: JSX.Element;
    children: JSX.Element | Array<JSX.Element>;
};
declare function Dropdown(props: Props): JSX.Element;
export { Dropdown };
