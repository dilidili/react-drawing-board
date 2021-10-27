import React from "react";
import RcDropdown from 'rc-dropdown';

function Dropdown(props: any) {
  /*const renderOverlay = (prefixCls: string) => {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    const { overlay } = props;

    let overlayNode;
    if (typeof overlay === 'function') {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }
    overlayNode = React.Children.only(
      typeof overlayNode === 'string' ? <span>{overlayNode}</span> : overlayNode,
    );

    const overlayProps = overlayNode.props;

    // menu cannot be selectable in dropdown defaultly
    const { selectable = false, expandIcon } = overlayProps;

    const overlayNodeExpandIcon =
      typeof expandIcon !== 'undefined' && React.isValidElement(expandIcon) ? (
        expandIcon
      ) : (
        <span className={`${prefixCls}-menu-submenu-arrow`}>
          <div className={`${prefixCls}-menu-submenu-arrow-icon`}>{`->`}</div>
        </span>
      );

    const fixedModeOverlay =
      typeof overlayNode.type === 'string'
        ? overlayNode
        : React.cloneElement(overlayNode, {
            mode: 'vertical',
            selectable,
            expandIcon: overlayNodeExpandIcon,
          });

    return fixedModeOverlay as React.ReactElement;
  };

  const child = React.Children.only(props.children) as React.ReactElement<any>;
  return (
    <RcDropdown
      arrow={props.arrow}
      alignPoint={props.alignPoint}
      {...props}
      overlayClassName={props.overlayClassNameCustomized}
      prefixCls={props.prefixCls}
      getPopupContainer={props.getPopupContainer || props.getContextPopupContainer}
      transitionName={'ease-in'}
      trigger={'click'}
      overlay={() => renderOverlay('geekie')}
      placement={'bottomRight'}
    >
      {child}
    </RcDropdown>
  );*/

  return (
    <div style={{display: props.visible?'block':'none'}}>
      {props.children}
    </div>
  );
}

export { Dropdown };

/*
getPopupContainer={(dom) => dom.parentElement}
key={tool.label}
overlay={overlay}
// placement={
//   toolbarPlacement === 'top' || toolbarPlacement === 'left'
//     ? 'bottomLeft'
//     : 'bottomRight'
// }
trigger={[isMobileDevice ? 'click' : 'hover']}
onVisibleChange={(visible) => {
  enableSketchPadContext.setEnable(!visible);
}}
*/