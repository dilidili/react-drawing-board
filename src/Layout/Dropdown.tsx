import React, { CSSProperties, MouseEventHandler } from "react";
// import Tool, { ToolOption, defaultToolOption } from '../enums/Tool';
// import { useStrokeDropdown } from "../StrokeTool";

function Dropdown(props: any) {
  console.log('DROPDOWN', props);
  const { children, overlay, isVisible } = props;
  // function toggleVisibility() {
  //   setVisible(!isVisible);
  // }

  let settingMenu = null;
  let content = null;
  const stopPropagation: MouseEventHandler = (e) => e.stopPropagation();

  //   switch (selectedOperation.tool) {
  //     case Tool.Stroke:
        // content = useStrokeDropdown({
        //   currentToolOption: defaultToolOption,
        //   setCurrentToolOption: (option: ToolOption) => {
        //     const data = {
        //       color: option.strokeColor,
        //       size: option.strokeSize,
        //     };

        //     handleCompleteOperation(Tool.Update, {
        //       operationId: selectedOperation.id,
        //       data,
        //     });

        //     setSelectedOperation({ ...selectedOperation, ...data });
        //   },
        //   setCurrentTool: () => {},
        //   prefixCls,
        // });
  //       break;
  //     case Tool.Shape:
  //       content = useShapeDropdown({
  //         currentToolOption: {
  //           shapeType: (selectedOperation as Shape).type,
  //           shapeBorderColor: (selectedOperation as Shape).color,
  //           shapeBorderSize: (selectedOperation as Shape).size,
  //         } as ToolOption,
  //         setCurrentToolOption: (option: ToolOption) => {
  //           const data = {
  //             type: option.shapeType,
  //             color: option.shapeBorderColor,
  //             size: option.shapeBorderSize,
  //           };

  //           handleCompleteOperation(Tool.Update, {
  //             operationId: selectedOperation.id,
  //             data,
  //           });

  //           setSelectedOperation({ ...selectedOperation, ...data });
  //         },
  //         setCurrentTool: () => {},
  //         prefixCls,
  //       });
  //       break;
  //     case Tool.Text: {
  //       const textOperation: Text = selectedOperation as Text;
  //       content = useTextDropdown(
  //         {
  //           textSize: textOperation.size,
  //           textColor: textOperation.color,
  //         } as ToolOption,
  //         (option: ToolOption) => {
  //           const data: Partial<Operation> = {
  //             color: option.textColor,
  //             size: option.textSize,
  //           };

  //           if (refContext.current && option.textSize !== textOperation.size) {
  //             const context = refContext.current;

  //             // font size has changed, need to update pos
  //             context.font = `${option.textSize}px ${font}`;
  //             context.textBaseline = 'alphabetic';
  //             // measureText does not support multi-line
  //             const lines = textOperation.text.split('\n');
  //             data.pos = {
  //               ...selectedOperation.pos,
  //               w: Math.max(...lines.map((line) => context.measureText(line).width)),
  //               h: lines.length * option.textSize,
  //             };
  //           }

  //           handleCompleteOperation(Tool.Update, {
  //             operationId: selectedOperation.id,
  //             data,
  //           });

  //           // @ts-ignore
  //           setSelectedOperation({ ...selectedOperation, ...data });
  //         },
  //         () => {},
  //         intl,
  //         prefixCls,
  //       );
  //       break;
  //     }
  //     default:
  //       break;
  //   }

  // const resultRect = {
  //   xMin: 10,
  //   xMax: 10 + 600,
  //   yMin: 200,
  //   yMax: 200 + 600,
  // };

  // const [a, b, c, d, e, f] = viewMatrix;
  // const selectPadding = Math.max((SELECT_PADDING * 1) / scale || 0, SELECT_PADDING);
  // const left = resultRect.xMin;
  // const top = resultRect.yMax + selectPadding;

  const menuStyle: CSSProperties = {
    position: 'absolute',
    top: 150,
    left: 0,
    // left: a * left + c * top + e,
    // top: b * left + d * top + f,
  };

  settingMenu = (
    <div style={menuStyle} onMouseDown={stopPropagation}>
      {/* {content} */}
      {overlay}
    </div>
  );

  return (
    <div
      style={{backgroundColor: 'rgba(255,0,0,0.3)', position: 'relative'}}
      // onClick={toggleVisibility}
    >
      {children}
      {isVisible ? settingMenu : null}
    </div>

  );
  // if (!visible) return null;
  // return <div onClick={onVisibleChange}>{overlay}</div>;
}

export { Dropdown };
