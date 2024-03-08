/**
 * @packageDocumentation
 * @module AuthContextProvider
 */

import React, { useEffect } from 'react';
import { AuthContextProviderProps } from './types';
import { AuthContext } from './context';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { i18nAuthInstance } from './i18nAuthInstance';
import { ErrorContext } from '../ErrorContext';
import { AuthDictionaries } from './AuthDictionaries';
import { SharedDictionaries } from '../SharedDictionaries';
import { ErrorManagerProps } from '../../components/Error';

const AuthContextProviderContent: React.FC<
    React.PropsWithChildren<Omit<AuthContextProviderProps, 'i18n'> & { PasswordDialog?: JSX.Element }>
> = (props) => {
    const { children, errorConfig, ...authContextProps } = props;
    const { t } = useTranslation();
    const mergedErrorConfig: ErrorManagerProps = {
        t: t,
        title: 'bluiCommon:MESSAGES.ERROR',
        error: 'bluiAuth:LOGIN.INVALID_CREDENTIALS',
        ...errorConfig,
        dialogConfig: {
            dismissLabel: 'bluiCommon:ACTIONS.OKAY',
            ...(errorConfig?.dialogConfig ?? {}),
        },
    };

    return (
        <AuthContext.Provider value={{ ...authContextProps }}>
            <ErrorContext.Provider value={mergedErrorConfig}>{children}</ErrorContext.Provider>
        </AuthContext.Provider>
    );
};

export const AuthContextProvider: React.FC<
    React.PropsWithChildren<AuthContextProviderProps & { PasswordDialog?: JSX.Element }>
> = (props) => {
    const i18nInstance = props.i18n ?? i18nAuthInstance;
    const { language, i18n = i18nInstance, children, ...other } = props;

    if (props.i18n) {
        i18n.addResourceBundle('zh', 'bluiAuth', AuthDictionaries.chinese.translation, true, false);
        i18n.addResourceBundle('zh', 'bluiCommon', SharedDictionaries.chinese.translation, true, false);
        i18n.addResourceBundle('en', 'bluiAuth', AuthDictionaries.english.translation, true, false);
        i18n.addResourceBundle('en', 'bluiCommon', SharedDictionaries.english.translation, true, false);
        i18n.addResourceBundle('fr', 'bluiAuth', AuthDictionaries.french.translation, true, false);
        i18n.addResourceBundle('fr', 'bluiCommon', SharedDictionaries.french.translation, true, false);
        i18n.addResourceBundle('pt', 'bluiAuth', AuthDictionaries.portuguese.translation, true, false);
        i18n.addResourceBundle('pt', 'bluiCommon', SharedDictionaries.portuguese.translation, true, false);
        i18n.addResourceBundle('es', 'bluiAuth', AuthDictionaries.spanish.translation, true, false);
        i18n.addResourceBundle('es', 'bluiCommon', SharedDictionaries.spanish.translation, true, false);
    }

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <I18nextProvider i18n={i18n}>
            <AuthContextProviderContent {...other} language={language}>
                {children}
            </AuthContextProviderContent>
        </I18nextProvider>
    );
};
