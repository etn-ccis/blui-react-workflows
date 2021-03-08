import React from 'react';

import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
} from '@pxblue/react-auth-workflow';
import { ProjectAuthUIActions } from './actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './actions/RegistrationUIActions';
import { ExampleHome } from './screens/ExampleHome';
import { routes } from './navigation/Routing';

import productLogo from './assets/images/eaton_stacked_logo.png';
import topology from './assets/images/topology.png';

export const AuthUIConfiguration: React.FC = (props) => {
    const securityContextActions = useSecurityActions();

    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            showSelfRegistration={false}
            allowDebugMode={true}
            htmlEula={false}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            projectImage={productLogo}
            background={{
                backgroundImage: `url(${topology})`,
                backgroundColor: 'orange',
                backgroundSize: '50%',
            }}
            showRememberMe={false}
            showContactSupport={false}
            enableResetPassword={false}
            enableInviteRegistration={false}
            // TODO
            // emailValidator
            // eulaScrollLock
        >
            {props.children}
        </AuthUIContextProvider>
    );
};

export const App: React.FC = () => (
    <SecurityContextProvider>
        <AuthUIConfiguration>
            <AuthNavigationContainer routeConfig={routes}>
                <ExampleHome />
            </AuthNavigationContainer>
        </AuthUIConfiguration>
    </SecurityContextProvider>
);
