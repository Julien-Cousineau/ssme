import en from './en';
import {flattenMessages} from './locale-utils';

const enFlat = flattenMessages(en);

export const LOCALES = {
  en: 'English',
  fr: 'French',
};

export const LOCALE_CODES = Object.keys(LOCALES).reduce((acc, key) => ({...acc, [key]: key}), {});

export const messages = Object.keys(LOCALE_CODES).reduce(
  (acc, key) => ({
    ...acc,
    [key]: key === 'en' ? enFlat : {...enFlat, ...flattenMessages(require(`./${key}`).default)}
  }),
  {}
);






export {default as FormattedMessage} from './formatted-message';
