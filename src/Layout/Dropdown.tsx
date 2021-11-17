import React from "react";

function Dropdown(props: any) {
  console.log('DROPDOWN', props);
  // let settingMenu = null;
  // let content = null;
  // const stopPropagation: MouseEventHandler = (e) => e.stopPropagation();

  //   switch (selectedOperation.tool) {
  //     case Tool.Stroke:
  //       content = useStrokeDropdown({
  //         currentToolOption: {
  //           strokeSize: (selectedOperation as Stroke).size,
  //           strokeColor: (selectedOperation as Stroke).color,
  //         } as ToolOption,
  //         setCurrentToolOption: (option: ToolOption) => {
  //           const data = {
  //             color: option.strokeColor,
  //             size: option.strokeSize,
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

  //   // const resultRect = {
  //   //   xMin: selectedOperation.pos.x,
  //   //   xMax: selectedOperation.pos.x + selectedOperation.pos.w,
  //   //   yMin: selectedOperation.pos.y,
  //   //   yMax: selectedOperation.pos.y + selectedOperation.pos.h,
  //   // };

  //   // const [a, b, c, d, e, f] = viewMatrix;
  //   // const selectPadding = Math.max((SELECT_PADDING * 1) / scale || 0, SELECT_PADDING);
  //   // const left = resultRect.xMin;
  //   // const top = resultRect.yMax + selectPadding;

  //   const menuStyle: CSSProperties = {
  //     position: 'absolute',
  //     left: a * left + c * top + e,
  //     top: b * left + d * top + f,
  //   };

  //   settingMenu = (
  //     <div style={menuStyle} onMouseDown={stopPropagation}>
  //       {content}
  //     </div>
  //   );

  return <div>{props.children}</div>;
}

export { Dropdown };
