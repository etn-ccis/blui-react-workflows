import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18nBluiInstance } from '.';
import { I18nInstanceProviderProps } from './types';

export const I18nInstanceProvider: React.FC<React.PropsWithChildren<I18nInstanceProviderProps>> = (props) => {
    const { i18nInstance = i18nBluiInstance } = props;

    return <I18nextProvider i18n={i18nInstance}>{props.children}</I18nextProvider>;
};
