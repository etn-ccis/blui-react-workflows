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
// import { Button, CardActions, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
// import { Link, Route } from 'react-router-dom';
// import { ExamplePreAuth } from './screens/ExamplePreAuth';
// import { EmptyState } from '@pxblue/react-components';
// import Person from '@material-ui/icons/Person';

// const customRegistrationSuccessScreen = (registrationData: RegistrationData | undefined): JSX.Element => (
//     <>
//         <CardHeader
//             title={
//                 <Typography variant={'h6'} style={{ fontWeight: 600 }}>
//                     Custom Registration Success Screen
//                 </Typography>
//             }
//             style={{ padding: '16px 24px' }}
//         />
//         <CardContent
//             style={{
//                 flex: '1 1 0px',
//                 overflow: 'auto',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100%',
//                 padding: '16px 24px',
//             }}
//         >
//             <EmptyState
//                 icon={<Person color={'primary'} style={{ fontSize: 100 }} />}
//                 title={`Congratulations ${registrationData?.accountDetails?.firstName || ''}${' '}
//                 ${registrationData?.accountDetails?.lastName || ''}!`}
//                 description={'You made it to the custom registration success screen!'}
//             />
//         </CardContent>
//         <Divider />
//         <CardActions style={{ padding: '24px', justifyContent: 'flex-end' }}>
//             <Button
//                 variant={'contained'}
//                 disableElevation
//                 color={'primary'}
//                 style={{ width: '100%' }}
//                 component={Link}
//                 to={'/custom-login-route'}
//             >
//                 Continue
//             </Button>
//         </CardActions>
//     </>
// );

// const customAccountAlreadyExistsScreen = (
//     <>
//         <CardHeader
//             title={
//                 <Typography variant={'h6'} style={{ fontWeight: 600 }}>
//                     Custom Account Already Exists Screen
//                 </Typography>
//             }
//             style={{ padding: '16px 24px' }}
//         />
//         <CardContent
//             style={{
//                 flex: '1 1 0px',
//                 overflow: 'auto',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100%',
//                 padding: '16px 24px',
//             }}
//         >
//             <EmptyState
//                 icon={<Person color={'primary'} style={{ fontSize: 100 }} />}
//                 title={'Congratulations!'}
//                 description={'You made it to the custom account already exists success screen!'}
//             />
//         </CardContent>
//         <Divider />
//         <CardActions style={{ padding: '24px', justifyContent: 'flex-end' }}>
//             <Button
//                 variant={'contained'}
//                 disableElevation
//                 color={'primary'}
//                 style={{ width: '100%' }}
//                 component={Link}
//                 to={'/custom-login-route'}
//             >
//                 Continue
//             </Button>
//         </CardActions>
//     </>
// );

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
            // registrationSuccessScreen={(registrationData: RegistrationData): JSX.Element =>
            //     customRegistrationSuccessScreen(registrationData)
            // }
            // accountAlreadyExistsScreen={(): JSX.Element => customAccountAlreadyExistsScreen}
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
