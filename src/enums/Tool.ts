enum Tool {
  Select = 'Select',
  Stroke = 'Stroke',
}

export const strokeSize = [2, 4, 6];

export const strokeColor = ['#4a4a4a', '#f55b6c', '#f7c924', '#63d321', '#50e3c2', '#59b9ff', '#bd10e0', '#ffffff'];

export const defaultToolOption = {
  strokeSize: 4,
  strokeColor: '#4a4a4a',
} 

export type ToolOption = {
  strokeSize: number,
  strokeColor: string,
};

export default Tool;