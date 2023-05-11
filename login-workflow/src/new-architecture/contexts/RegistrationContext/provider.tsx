/**
 * @packageDocumentation
 * @module RegistrationWorkflowContextProvider
 */

import React, { useMemo } from 'react';
import { RegistrationContextProviderProps } from './types';
import { RegistrationContext } from './context';
import { I18nextProvider } from 'react-i18next';
import { i18nRegistrationInstance } from '../i18nInstance';

export const RegistrationContextProvider: React.FC<React.PropsWithChildren<RegistrationContextProviderProps>> = (
    props
) => {
    // NOTE: When adding new props to RegistrationContextProviderProps be sure
    // to also add them here so the parameters are copied.
    const { actions, language, navigate, routeConfig, i18n = i18nRegistrationInstance } = props;

    const memoizedProps = useMemo(() => {
        const propsForContext: RegistrationContextProviderProps = {
            actions: actions,
            language: language,
            navigate: navigate,
            routeConfig: routeConfig,
            i18n: i18n,
        };

        return propsForContext;
    }, [actions, language, navigate, routeConfig, i18n]);

    return (
        <I18nextProvider i18n={i18n}>
            <RegistrationContext.Provider value={memoizedProps}>{props.children}</RegistrationContext.Provider>
        </I18nextProvider>
    );
};
