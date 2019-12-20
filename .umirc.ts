import { IConfig } from 'umi-types';

const config: IConfig = {
  plugins: [
    ['umi-plugin-block-dev', {}],
    ['umi-plugin-react', {
      antd: true,
      locale: {
        default: 'zh-CN',
        baseNavigator: true,
        antd: true,
        baseSeparator: '-',
      },
    }]
  ],
}

export default config;
