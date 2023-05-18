/**
 * @packageDocumentation
 * @module AuthContextProvider
 */

import React, { useEffect } from 'react';
import { AuthContextProviderProps } from './types';
import { AuthContext } from './context';
import { I18nextProvider } from 'react-i18next';
import { i18nAuthInstance } from './i18nAuthInstance';

export const AuthContextProvider: React.FC<React.PropsWithChildren<AuthContextProviderProps>> = (props) => {
    const { children, ...authContextProps } = props;
    const { language, i18n = i18nAuthInstance } = props;

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <I18nextProvider i18n={i18n}>
            <AuthContext.Provider value={authContextProps}>{children}</AuthContext.Provider>
        </I18nextProvider>
    );
};
