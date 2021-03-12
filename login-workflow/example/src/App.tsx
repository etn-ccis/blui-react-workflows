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
import { CustomDetailsScreen, CustomDetailsScreenTwo } from './components/CustomDetailsScreen';
import topology from './assets/images/topology.png';
import { Typography } from '@material-ui/core';
import { Link, Route } from 'react-router-dom';

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
            // showSelfRegistration={false}
            // customAccountDetails={[null, CustomDetailsScreen, CustomDetailsScreenTwo]}
            // background={{
            //     backgroundImage: `url(${topology})`,
            //     backgroundColor: 'red',
            //     backgroundSize: '50%',
            //     backgroundRepeat: 'no-repeat'
            // }}
            // showRememberMe={false}
            // showContactSupport={false}
            // enableResetPassword={false}
            // enableInviteRegistration={false}
            // showCybersecurityBadge={false}
            // loginFooter={
            //     <>
            //         <Typography variant="body2" color={'primary'}>
            //             <Link to={'/fake-route'}>GO SOMEWHERE</Link>
            //         </Typography>
            //         <Typography variant="body2" color={'primary'}>
            //             <Link to={'/fake-route-two'}>GO SOMEWHERE 2</Link>
            //         </Typography>
            //     </>
            // }
            // loginHeader={<Typography variant={'h3'}>My Project</Typography>}
        >
            {props.children}
        </AuthUIContextProvider>
    );
};

export const App: React.FC = () => (
    <SecurityContextProvider>
        <AuthUIConfiguration>
            <AuthNavigationContainer
                // @ts-ignore
                // extraRoutes={
                //     [
                //         <Route path={'/fake-route'}>
                //             <Typography>FAKE ROUTE</Typography>
                //         </Route>,
                //         <Route path={'/fake-route-two'}>
                //             <Typography>FAKE ROUTE TWO</Typography>
                //         </Route>
                //     ]
                // }
                routeConfig={routes}
            >
                <ExampleHome />
            </AuthNavigationContainer>
        </AuthUIConfiguration>
    </SecurityContextProvider>
);
