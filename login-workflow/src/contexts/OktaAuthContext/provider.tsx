/**
 * @packageDocumentation
 * @module OktaAuthContextProvider
 */

import React, { useEffect } from 'react';
import { OktaAuthContextProviderProps } from './types';
import { OktaAuthContext } from './context';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { i18nOktaAuthInstance } from './i18nOktaAuthInstance';
import { ErrorContext } from '../ErrorContext';
import { OktaAuthDictionaries } from './OktaAuthDictionaries';
import { AuthDictionaries } from '../AuthContext/AuthDictionaries';
import { SharedDictionaries } from '../SharedDictionaries';
import { ErrorManagerProps } from '../../components/Error/types';

const OktaAuthContextProviderContent: React.FC<
    React.PropsWithChildren<Omit<OktaAuthContextProviderProps, 'i18n'> & { PasswordDialog?: JSX.Element }>
> = (props) => {
    const { children, errorConfig, ...oktaAuthContextProps } = props;
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
        <OktaAuthContext.Provider value={{ ...oktaAuthContextProps }}>
            <ErrorContext.Provider value={mergedErrorConfig}>{children}</ErrorContext.Provider>
        </OktaAuthContext.Provider>
    );
};

export const OktaAuthContextProvider: React.FC<
    React.PropsWithChildren<OktaAuthContextProviderProps & { PasswordDialog?: JSX.Element }>
> = (props) => {
    const i18nInstance = props.i18n ?? i18nOktaAuthInstance;
    const { language, i18n = i18nInstance, children, ...other } = props;

    if (props.i18n) {
        i18n.addResourceBundle('zh', 'bluiAuth', AuthDictionaries.chinese.translation, true, false);
        i18n.addResourceBundle('zh', 'bluiOktaAuth', OktaAuthDictionaries.chinese.translation, true, false);
        i18n.addResourceBundle('zh', 'bluiCommon', SharedDictionaries.chinese.translation, true, false);
        i18n.addResourceBundle('zh', 'bluiAuth', AuthDictionaries.english.translation, true, false);
        i18n.addResourceBundle('en', 'bluiOktaAuth', OktaAuthDictionaries.english.translation, true, false);
        i18n.addResourceBundle('en', 'bluiCommon', SharedDictionaries.english.translation, true, false);
        i18n.addResourceBundle('zh', 'bluiAuth', AuthDictionaries.french.translation, true, false);
        i18n.addResourceBundle('fr', 'bluiOktaAuth', OktaAuthDictionaries.french.translation, true, false);
        i18n.addResourceBundle('fr', 'bluiCommon', SharedDictionaries.french.translation, true, false);
        i18n.addResourceBundle('zh', 'bluiAuth', AuthDictionaries.portuguese.translation, true, false);
        i18n.addResourceBundle('pt', 'bluiOktaAuth', OktaAuthDictionaries.portuguese.translation, true, false);
        i18n.addResourceBundle('pt', 'bluiCommon', SharedDictionaries.portuguese.translation, true, false);
        i18n.addResourceBundle('zh', 'bluiAuth', AuthDictionaries.spanish.translation, true, false);
        i18n.addResourceBundle('es', 'bluiOktaAuth', OktaAuthDictionaries.spanish.translation, true, false);
        i18n.addResourceBundle('es', 'bluiCommon', SharedDictionaries.spanish.translation, true, false);
    }

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <I18nextProvider i18n={i18n}>
            <OktaAuthContextProviderContent {...other} language={language}>
                {children}
            </OktaAuthContextProviderContent>
        </I18nextProvider>
    );
};
