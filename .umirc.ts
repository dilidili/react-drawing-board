import { IConfig } from 'umi-types';

const config: IConfig = {
  plugins: [
    ['umi-plugin-block-dev', {}],
    ['umi-plugin-react', {}],
  ],
  disableCSSModules: true,
};

export default config;
