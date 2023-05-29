/* eslint-disable */
import React, { useState } from 'react';
import { IndividualScreenData, RegistrationWorkflowContextProvider } from '../../contexts';

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
        Other: {},
    });

    const handleScreenNavigation = (data: IndividualScreenData): void => {
        if (!Object.keys(screenData).includes(data.screenId)) {
            setScreenData((oldData) => ({
                ...oldData,
                Other: { ...oldData.Other, [data.screenId]: data.values },
            }));
        } else if (Object.keys(screenData.Other).includes(data.screenId)) {
            const screenId = data.screenId;
            const Other = screenData.Other;
            const { values } = data;
            setScreenData((oldData) => ({
                ...oldData,
                /* @ts-ignore */
                Other: { ...Other, [screenId]: { ...screenData.Other[screenId], ...values } },
            }));
        } else {
            setScreenData((oldData) => ({
                ...oldData,
                [data.screenId]: data.values,
            }));
        }
    };

    return (
        <RegistrationWorkflowContextProvider
            currentScreen={currentScreen}
            totalScreens={totalScreens}
            nextScreen={(data): void => {
                handleScreenNavigation(data);
                setCurrentScreen((i) => i + 1);
            }}
            previousScreen={(data): void => {
                handleScreenNavigation(data);
                setCurrentScreen((i) => i - 1);
            }}
            screenData={screenData}
        >
            {screens[currentScreen]}
        </RegistrationWorkflowContextProvider>
    );
};
