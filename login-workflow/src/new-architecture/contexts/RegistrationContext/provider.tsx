/**
 * @packageDocumentation
 * @module RegistrationWorkflowContextProvider
 */

import React, { useEffect } from 'react';
import { RegistrationContextProviderProps } from './types';
import { RegistrationContext } from './context';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { i18nRegistrationInstance } from './i18nRegistrationInstance';
import Typography from '@mui/material/Typography';

export const RegistrationContextProvider: React.FC<React.PropsWithChildren<RegistrationContextProviderProps>> = (
    props
) => {
    const { language, i18n = i18nRegistrationInstance } = props;

    useEffect(() => {
        void i18n.changeLanguage(language);
        console.log('i18n: ', i18n, 'language: ', language);
    }, [i18n, language]);

    return (
        <I18nextProvider i18n={i18n}>
            <RenderWithTranslations {...props} />
        </I18nextProvider>
    );
};

const RenderWithTranslations: React.FC<React.PropsWithChildren<RegistrationContextProviderProps>> = (props) => {
    const { t } = useTranslation();

    return (
        <RegistrationContext.Provider value={props}>
            <>
                <Typography>{t('bluiRegistration:REGISTRATION.EULA.LOADING')}</Typography>
                <Typography>{t('bluiRegistration:REGISTRATION.STEPS.COMPLETE')}</Typography>
                {props.children}
            </>
        </RegistrationContext.Provider>
    );
};
