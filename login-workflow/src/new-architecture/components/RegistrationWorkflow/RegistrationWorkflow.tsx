import React, { useState } from 'react';
import { RegistrationWorkflowContextProvider } from '../../contexts';

export type RegistrationWorkflowProps = {
    initialScreenIndex?: number;
};

export const RegistrationWorkflow: React.FC<React.PropsWithChildren<RegistrationWorkflowProps>> = (props) => {
    const { initialScreenIndex = 0, children } = props;
    const screens = [...(Array.isArray(children) ? children : [children])];
    const [currentScreen, setCurrentScreen] = useState(initialScreenIndex);
    const totalScreens = screens.length;

    const [screenData, setScreenData] = useState({
        Eula: {
            accepted: false,
        },
        CreateAccount: {
            emailAddress: '',
        },
        VerifyCode: {
            code: '',
        },
        CreatePassword: {
            password: '',
            confirmPassword: '',
        },
        AccountDetails: {
            firstName: '',
            lastName: '',
        },
    });

    return (
        <RegistrationWorkflowContextProvider
            currentScreen={currentScreen}
            totalScreens={totalScreens}
            nextScreen={(data): void => {
                setScreenData((oldData) => ({
                    ...oldData,
                    [data.screenId]: data.values,
                }));
                setCurrentScreen((i) => i + 1);
            }}
            previousScreen={(data): void => {
                setScreenData((oldData) => ({
                    ...oldData,
                    [data.screenId]: data.values,
                }));
                setCurrentScreen((i) => i - 1);
            }}
            screenData={screenData}
        >
            {screens[currentScreen]}
        </RegistrationWorkflowContextProvider>
    );
};
