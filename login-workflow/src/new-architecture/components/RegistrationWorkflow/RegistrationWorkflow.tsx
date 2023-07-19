import React, { useState } from 'react';
import { IndividualScreenData, RegistrationWorkflowContextProvider, useRegistrationContext } from '../../contexts';
import { useErrorContext } from '../../contexts/ErrorContext';
import { RegistrationSuccessScreen } from '../../screens';
import { AuthError } from '../Error';

export type RegistrationWorkflowProps = {
    initialScreenIndex?: number;
};

export const RegistrationWorkflow: React.FC<React.PropsWithChildren<RegistrationWorkflowProps>> = (props) => {
    const { initialScreenIndex = 0, children } = props;
    const screens = [...(Array.isArray(children) ? children : [children])];
    const totalScreens = screens.length;
    const [currentScreen, setCurrentScreen] = useState(
        initialScreenIndex < 0 ? 0 : initialScreenIndex > totalScreens - 1 ? totalScreens - 1 : initialScreenIndex
    );
    const [error, setError] = useState<AuthError>({ cause: { title: '', errorMessage: '' } });
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const { actions } = useRegistrationContext();
    const errorConfig = useErrorContext();

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

    const updateScreenData = (data: IndividualScreenData): void => {
        const { Other } = screenData;
        const { screenId, values } = data;
        if (!Object.keys(screenData).includes(screenId)) {
            setScreenData((oldData) => ({
                ...oldData,
                Other: { ...oldData.Other, [screenId]: values },
            }));
        } else if (Object.keys(Other).includes(screenId)) {
            setScreenData((oldData) => ({
                ...oldData,
                /* @ts-ignore */
                Other: { ...Other, [screenId]: { ...Other[screenId], ...values } },
            }));
        } else {
            setScreenData((oldData) => ({
                ...oldData,
                [screenId]: values,
            }));
        }
    };

    const onNext = (): Promise<void> => {
        const { firstName, lastName } = screenData.AccountDetails;
        if (actions && actions().completeRegistration)
            return actions()
                .completeRegistration(
                    { firstName, lastName },
                    screenData.VerifyCode.code,
                    screenData.CreateAccount.emailAddress
                )
                .then(({ email, organizationName }) => {
                    updateScreenData({
                        screenId: 'RegistrationSuccessScreen',
                        values: { email, organizationName },
                    });
                    setShowSuccessScreen(true);
                })
                .catch((_error) => {
                    setError({
                        cause: {
                            title: (_error as AuthError).cause.title,
                            errorMessage: (_error as AuthError).cause.errorMessage,
                        },
                    });
                });
    };

    return (
        <RegistrationWorkflowContextProvider
            currentScreen={currentScreen}
            totalScreens={totalScreens}
            nextScreen={(data): Promise<void> => {
                updateScreenData(data);
                if (currentScreen === totalScreens - 1) return onNext();
                setCurrentScreen((i) => i + 1);
            }}
            previousScreen={(data): void => {
                updateScreenData(data);
                setCurrentScreen((i) => i - 1);
            }}
            screenData={screenData}
            updateScreenData={updateScreenData}
        >
            {showSuccessScreen ? (
                <RegistrationSuccessScreen
                    errorDisplayConfig={{
                        ...errorConfig,
                        title: error.cause.title,
                        errorMessage: error.cause.errorMessage,
                        onClose: (): void => {
                            setError({ cause: { title: '', errorMessage: '' } });
                        },
                    }}
                />
            ) : (
                screens[currentScreen]
            )}
        </RegistrationWorkflowContextProvider>
    );
};
