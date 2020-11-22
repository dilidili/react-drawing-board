import enUS from './en-US';
import zhCN from './zh-CN';
import trTR from './tr-TR';

export type localeType = 'en-US' | 'zh-CN' | 'tr-TR' | 'en' | 'zh' | 'tr';

export default {
  messages: {
    ['en-US']: enUS,
    ['zh-CN']: zhCN,
    ['tr-TR']: trTR,
    ['en']: enUS,
    ['zh']: zhCN,
    ['tr']: enUS,
  },
};
