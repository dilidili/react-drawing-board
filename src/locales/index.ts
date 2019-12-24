import enUS from './en-US';
import zhCN from './zh-CN';

export enum localeType {
  enUS = 'en-US',
  zhCN = 'zh-CN',
}

export default {
  messages: {
    ['en-US']: enUS,
    ['zh-CN']: zhCN,
  },
};