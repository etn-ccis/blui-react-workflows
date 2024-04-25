/**
 * @packageDocumentation
 * @module RegistrationContextProvider
 */

import React, { useEffect } from 'react';
import { RegistrationContextProviderProps } from './types';
import { RegistrationContext } from './context';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { i18nRegistrationInstance } from './i18nRegistrationInstance';
import { ErrorContext } from '../ErrorContext';
import { SharedDictionaries } from '../SharedDictionaries';
import { RegistrationDictionaries } from './RegistrationDictionaries';
import { ErrorManagerProps } from '../../components/Error/types';

const RegistrationContextProviderContent: React.FC<
    React.PropsWithChildren<Omit<RegistrationContextProviderProps, 'i18n'>>
> = (props) => {
    const { children, errorConfig, ...registrationContextProps } = props;
    const { t } = useTranslation();
    const mergedErrorConfig: ErrorManagerProps = {
        t: t,
        title: 'bluiCommon:MESSAGES.ERROR',
        ...errorConfig,
        dialogConfig: {
            dismissLabel: 'bluiCommon:ACTIONS.OKAY',
            ...(errorConfig?.dialogConfig ?? {}),
        },
    };

    return (
        <RegistrationContext.Provider value={{ ...registrationContextProps }}>
            <ErrorContext.Provider value={mergedErrorConfig}>{children}</ErrorContext.Provider>
        </RegistrationContext.Provider>
    );
};

export const RegistrationContextProvider: React.FC<React.PropsWithChildren<RegistrationContextProviderProps>> = (
    props
) => {
    const i18nInstance = props.i18n ?? i18nRegistrationInstance;
    const { language, i18n = i18nInstance, children, ...other } = props;

    if (props.i18n) {
        i18n.addResourceBundle('zh', 'bluiRegistration', RegistrationDictionaries.chinese.translation, true, false);
        i18n.addResourceBundle('zh', 'bluiCommon', SharedDictionaries.chinese.translation, true, false);
        i18n.addResourceBundle('en', 'bluiRegistration', RegistrationDictionaries.english.translation, true, false);
        i18n.addResourceBundle('en', 'bluiCommon', SharedDictionaries.english.translation, true, false);
        i18n.addResourceBundle('fr', 'bluiRegistration', RegistrationDictionaries.french.translation, true, false);
        i18n.addResourceBundle('fr', 'bluiCommon', SharedDictionaries.french.translation, true, false);
        i18n.addResourceBundle('pt', 'bluiRegistration', RegistrationDictionaries.portuguese.translation, true, false);
        i18n.addResourceBundle('pt', 'bluiCommon', SharedDictionaries.portuguese.translation, true, false);
        i18n.addResourceBundle('es', 'bluiRegistration', RegistrationDictionaries.spanish.translation, true, false);
        i18n.addResourceBundle('es', 'bluiCommon', SharedDictionaries.spanish.translation, true, false);
    }

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <I18nextProvider i18n={i18n}>
            <RegistrationContextProviderContent {...other} language={language}>
                {children}
            </RegistrationContextProviderContent>
        </I18nextProvider>
    );
};
