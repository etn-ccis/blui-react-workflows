import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { To } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import OktaAuth, { OktaAuthOptions, toRelativeUrl } from '@okta/okta-auth-js';
import oktaConfig from '../oktaConfig';
import { MainRouter } from './MainRouter';

const oktaAuth = new OktaAuth(oktaConfig as OktaAuthOptions);

export const AppRouter: React.FC = () => {
    const navigation = useNavigate();
    const navigate = useCallback((destination: -1 | string) => {
        navigation(destination as To);
    }, []);

    const restoreOriginalUri = (_oktaAuth: any, originalUri: any): void => {
        navigate(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <MainRouter />
        </Security>
    );
};
