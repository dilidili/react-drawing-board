import React from 'react';

const EnableSketchPadContext = React.createContext<{
  enable: boolean;
  setEnable: (enable: boolean) => void,
}>({
  enable: true,
  setEnable: () => {},
});

export default EnableSketchPadContext;