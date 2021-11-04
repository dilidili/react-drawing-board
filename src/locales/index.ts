import enUS from './en-US';
import zhCN from './zh-CN';
import trTR from './tr-TR';
import ptBR from './pt-BR';

export type localeType = 'en-US' | 'zh-CN' | 'tr-TR' | 'en' | 'zh' | 'tr' | 'pt-BR';

export default {
  messages: {
    ['en-US']: enUS,
    ['zh-CN']: zhCN,
    ['tr-TR']: trTR,
    ['en']: enUS,
    ['zh']: zhCN,
    ['tr']: enUS,
    ['pt-BR']: ptBR,
  },
};
