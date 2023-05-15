/**
 * @packageDocumentation
 * @module RegistrationWorkflowContextProvider
 */

import React, { useEffect } from 'react';
import { AuthContextProviderProps } from './types';
import { AuthContext } from './context';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { i18nAuthInstance } from './i18nAuthInstance';
import Typography from '@mui/material/Typography';

export const AuthContextProvider: React.FC<React.PropsWithChildren<AuthContextProviderProps>> = (props) => {
    const { language, i18n = i18nAuthInstance } = props;
    const { t } = useTranslation();

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <I18nextProvider i18n={i18n}>
            {/* @TODO: The typography elements are only here for testing purposes.
                Remove everything except for props.children from this component before publishing */}
            <Typography>{t('bluiAuth:MESSAGES.LOADING')}</Typography>
            <AuthContext.Provider value={props}>{props.children}</AuthContext.Provider>
        </I18nextProvider>
    );
};
