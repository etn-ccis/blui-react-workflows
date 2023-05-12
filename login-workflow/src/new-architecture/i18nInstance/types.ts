import { i18n } from 'i18next';
import { I18nextProviderProps } from 'react-i18next';

export type I18nInstanceProviderProps = I18nextProviderProps & {
    i18nInstance: i18n;
};
