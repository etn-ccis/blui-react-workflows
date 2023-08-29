import React from 'react';
import {
    AccountDetailsScreen,
    CreateAccountScreen,
    CreatePasswordScreen,
    EulaScreen,
    RegistrationContextProvider,
    RegistrationWorkflow,
    VerifyCodeScreen,
    RegistrationSuccessScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { routes } from '../navigation/Routing';

export const AppRouter: React.FC = () => {
    // Language will be managed by some state within your app, in this example, a useApp hook that gets the app language.
    const { language } = useApp();
    const navigate = useNavigate();
    return (
        <Routes>
            {/* REGISTRATION ROUTES */}
            <Route
                element={
                    <RegistrationContextProvider
                        language={language}
                        routeConfig={routes}
                        navigate={navigate}
                        actions={ProjectRegistrationUIActions}
                    >
                        <Outlet />
                    </RegistrationContextProvider>
                }
            >
                <Route
                    path={'/self-registration'}
                    element={
                        <RegistrationWorkflow initialScreenIndex={0}>
                            <EulaScreen />
                            <CreateAccountScreen
                            emailValidator={(email): boolean | string => email.length > 1 ? true : 'error must be 2 chars'}/>
                            <VerifyCodeScreen 
                            codeValidator={(code): boolean | string => code.length > 1 ? true : 'error must be 2 chars'}/>
                            <CreatePasswordScreen />
                            {/* <AccountDetailsScreen /> */}
                            <AccountDetailsScreen
                            firstNameValidator={(name): boolean | string => name.length > 1 ? true : 'error must be 2 chars'}
                            lastNameValidator={(name): boolean | string => name.length > 1 ? true : 'error must be 2 chars'} />
                        </RegistrationWorkflow>
                    }
                />
                <Route
                    path={'/register-by-invite'}
                    element={
                        <RegistrationWorkflow initialScreenIndex={0}>
                            <EulaScreen />
                            <CreatePasswordScreen />
                            <AccountDetailsScreen
                            lastNameTextFieldProps />
                            <RegistrationSuccessScreen />
                        </RegistrationWorkflow>
                    }
                />
            </Route>
        </Routes>
    );
};