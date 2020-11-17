import enUS from './en-US';
import zhCN from './zh-CN';
import trTR from './tr-TR';

export enum localeType {
  enUS = 'en-US',
  zhCN = 'zh-CN',
  trTR = 'tr-TR'
}

export default {
  messages: {
    ['en-US']: enUS,
    ['zh-CN']: zhCN,
    ['tr-TR']: trTR,
    ['en']: enUS,
    ['zh']: zhCN,
    ['tr']: trTR,
  },
};