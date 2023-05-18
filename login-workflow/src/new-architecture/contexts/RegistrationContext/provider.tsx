/**
 * @packageDocumentation
 * @module RegistrationWorkflowContextProvider
 */

import React, { useEffect } from 'react';
import { RegistrationContextProviderProps } from './types';
import { RegistrationContext } from './context';
import { I18nextProvider } from 'react-i18next';
import { i18nRegistrationInstance } from './i18nRegistrationInstance';

export const RegistrationContextProvider: React.FC<React.PropsWithChildren<RegistrationContextProviderProps>> = (
    props
) => {
    const { children, ...registrationContextProps } = props;
    const { language, i18n = i18nRegistrationInstance } = props;

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <I18nextProvider i18n={i18n}>
            <RegistrationContext.Provider value={registrationContextProps}>{children}</RegistrationContext.Provider>
        </I18nextProvider>
    );
};
