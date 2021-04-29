import React from 'react';
import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
    // RegistrationData,
} from '@pxblue/react-auth-workflow';
import { ProjectAuthUIActions } from './actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './actions/RegistrationUIActions';
import { ExampleHome } from './screens/ExampleHome';
// import { CustomDetailsScreen, CustomDetailsScreenTwo } from './components/CustomDetailsScreen';
import { routes } from './navigation/Routing';
import productLogo from './assets/images/eaton_stacked_logo.png';
// import { Route } from 'react-router-dom';
// import { ExamplePreAuth } from './screens/ExamplePreAuth';
// import {
//     CustomAccountAlreadyExistsScreen,
//     CustomRegistrationSuccessScreen,
// } from './screens/ExampleRegistrationSuccess';

export const AuthUIConfiguration: React.FC = (props) => {
    const securityContextActions = useSecurityActions();

    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            allowDebugMode={true}
            htmlEula={false}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            projectImage={productLogo}
            // Uncomment this line to see how to add custom form fields to the registration screens
            // customAccountDetails={[
            //     { component: CustomDetailsScreen },
            //     {
            //         component: CustomDetailsScreenTwo,
            //         title: 'Job Info',
            //         instructions: 'Enter your employment information below.',
            //     },
            // ]}
            // registrationSuccessScreen={(registrationData: RegistrationData): JSX.Element => (
            //     <CustomRegistrationSuccessScreen registrationData={registrationData} />
            // )}
            // accountAlreadyExistsScreen={(): JSX.Element => <CustomAccountAlreadyExistsScreen />}
        >
            {props.children}
        </AuthUIContextProvider>
    );
};

export const App: React.FC = () => (
    <SecurityContextProvider>
        <AuthUIConfiguration>
            <AuthNavigationContainer
                routeConfig={routes}
                // extraRoutes={[<Route exact path={'/pre-auth'} component={ExamplePreAuth} key={'pre-auth'} />]}
            >
                <ExampleHome />
            </AuthNavigationContainer>
        </AuthUIConfiguration>
    </SecurityContextProvider>
);
