import React from 'react';

// import { createStackNavigator } from '@react-navigation/stack';
import { ExampleHome } from './screens/ExampleHome';

import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
} from '@pxblue/react-auth-workflow';
import { ProjectAuthUIActions } from './actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './actions/RegistrationUIActions';

// import { useLinking } from '@react-navigation/native';
// import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';

// import { Provider as ThemeProvider } from 'react-native-paper';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as PXBThemes from '@pxblue/react-themes';
import { CssBaseline } from '@material-ui/core';

// const Stack = createStackNavigator();

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
        // projectImage={require('./src/assets/images/some_image.png')}
        >
            {props.children}
        </AuthUIContextProvider>
    );
}

export const App: React.FC = () => {
    const ref = React.useRef(null);
    // const { getInitialState } = useLinking(ref, authLinkMapping);
    const [initialState, setInitialState] = React.useState();
    // React.useEffect(() => {
    //     resolveInitialState(getInitialState, setInitialState);
    // }, [getInitialState]);

    return (
        <ThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
            <CssBaseline />
            <SecurityContextProvider>
                <AuthUIConfiguration>
                    <AuthNavigationContainer /*initialState={initialState} ref={ref}*/>
                        <ExampleHome />
                    </AuthNavigationContainer>
                </AuthUIConfiguration>
            </SecurityContextProvider>
        </ThemeProvider>
    );
};
