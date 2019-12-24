import React from 'react';

export const DefaultConfig = {
  prefixCls: 'drawing-board',
};

const ConfigContext = React.createContext(DefaultConfig);
export default ConfigContext;