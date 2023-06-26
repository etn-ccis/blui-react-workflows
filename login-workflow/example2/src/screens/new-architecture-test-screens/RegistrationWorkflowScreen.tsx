import React from 'react';
import {
    RegistrationWorkflow,
    i18nRegistrationInstance,
    RegistrationContextProvider,
    EulaScreen,
    AccountDetailsScreen,
    CreatePasswordScreen,
    RegistrationSuccessScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContextProvider';
import { ProjectRegistrationUIActions } from '../../actions/RegistrationUIActions';
import { routes } from '../../navigation/Routing';

export const RegistrationWorkflowScreen = (): JSX.Element => {
    const { language } = useApp();
    const navigate = useNavigate();

    return (
        <RegistrationContextProvider
            i18n={i18nRegistrationInstance}
            language={language}
            routeConfig={routes}
            navigate={navigate}
            actions={ProjectRegistrationUIActions}
        >
            <RegistrationWorkflow initialScreenIndex={0}>
                <EulaScreen />
                <AccountDetailsScreen />
                <CreatePasswordScreen />
                <RegistrationSuccessScreen />
            </RegistrationWorkflow>
        </RegistrationContextProvider>
    );
};
