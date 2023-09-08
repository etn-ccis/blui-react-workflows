/**
 * @packageDocumentation
 * @module RegistrationWorkflowContextProvider
 */

import React, { useEffect } from 'react';
import { RegistrationContextProviderProps } from './types';
import { RegistrationContext } from './context';
import { I18nextProvider } from 'react-i18next';
import { i18nRegistrationInstance } from './i18nRegistrationInstance';
import { ErrorContext } from '../ErrorContext';
import { SharedDictionaries } from '../SharedDictionaries';
import { RegistrationDictionaries } from './RegistrationDictionaries';

export const RegistrationContextProvider: React.FC<React.PropsWithChildren<RegistrationContextProviderProps>> = (
    props
) => {
    const i18nInstance = props.i18n ?? i18nRegistrationInstance;
    const { children, ...registrationContextProps } = props;
    const { language, i18n = i18nInstance, errorConfig } = props;

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
            <RegistrationContext.Provider value={registrationContextProps}>
                <ErrorContext.Provider value={errorConfig}>{children}</ErrorContext.Provider>
            </RegistrationContext.Provider>
        </I18nextProvider>
    );
};
