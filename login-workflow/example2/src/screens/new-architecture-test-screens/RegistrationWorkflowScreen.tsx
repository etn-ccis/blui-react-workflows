import React from 'react';
import {
    RegistrationWorkflow,
    i18nRegistrationInstance,
    RegistrationContextProvider,
    EulaScreen,
    AccountDetailsScreen,
    CreatePasswordScreen,
    CreateAccountScreen,
    VerifyCodeScreen,
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
            errorConfig={{
                mode: 'message-box',
                messageBoxConfig: {
                    dismissible: true,
                    position: 'bottom',
                },
            }}
        >
            <RegistrationWorkflow initialScreenIndex={0}>
                <EulaScreen />
                <CreateAccountScreen />
                <VerifyCodeScreen />
                <CreatePasswordScreen />
                <AccountDetailsScreen />
            </RegistrationWorkflow>
        </RegistrationContextProvider>
    );
};
