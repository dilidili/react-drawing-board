import React from 'react';

export const DefaultConfig = {
  prefixCls: 'drawing-board',
  showBackgroundTool: false,
};

const ConfigContext = React.createContext(DefaultConfig);
export default ConfigContext;
