import React, { useEffect, useState } from 'react';
import { IndividualScreenData, RegistrationWorkflowContextProvider, useRegistrationContext } from '../../contexts';
import {
    AccountDetailsScreen,
    CreateAccountScreen,
    CreatePasswordScreen,
    EulaScreen,
    RegistrationSuccessScreen,
    VerifyCodeScreen,
} from '../../screens';
import { parseQueryString } from '../../utils';

export type RegistrationWorkflowProps = {
    initialScreenIndex?: number;
    successScreen?: JSX.Element;
    isInviteRegistration?: boolean;
};

export const RegistrationWorkflow: React.FC<React.PropsWithChildren<RegistrationWorkflowProps>> = (props) => {
    const {
        initialScreenIndex = 0,
        successScreen = <RegistrationSuccessScreen />,
        isInviteRegistration = false,
        children = isInviteRegistration
            ? [
                  <EulaScreen key="EulaScreen" />,
                  <CreatePasswordScreen key="CreatePasswordScreen" />,
                  <AccountDetailsScreen key="AccountDetailsScreen" />,
              ]
            : [
                  <EulaScreen key="EulaScreen" />,
                  <CreateAccountScreen key="CreateAccountScreen" />,
                  <VerifyCodeScreen key="VerifyCodeScreen" />,
                  <CreatePasswordScreen key="CreatePasswordScreen" />,
                  <AccountDetailsScreen key="AccountDetailsScreen" />,
              ],
    } = props;

    const screens = [...(Array.isArray(children) ? children : [children])];
    const totalScreens = screens.length;
    const [currentScreen, setCurrentScreen] = useState(
        initialScreenIndex < 0 ? 0 : initialScreenIndex > totalScreens - 1 ? totalScreens - 1 : initialScreenIndex
    );
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const { actions } = useRegistrationContext();

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

    const finishRegistration = (data: IndividualScreenData): Promise<void> => {
        if (actions && actions().completeRegistration)
            return actions()
                .completeRegistration(data.values, screenData.VerifyCode.code, screenData.CreateAccount.emailAddress)
                .then(({ email, organizationName }) => {
                    updateScreenData({
                        screenId: 'RegistrationSuccessScreen',
                        values: { email, organizationName },
                    });
                    setShowSuccessScreen(true);
                })
                .catch((_error) => {
                    // eslint-disable-next-line no-console
                    console.log(_error);
                });
    };

    useEffect(() => {
        if (isInviteRegistration) {
            const params = parseQueryString(window.location.search);

            updateScreenData({ screenId: 'CreateAccount', values: { emailAddress: params.email } });
            updateScreenData({ screenId: 'VerifyCode', values: { code: params.code } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <RegistrationWorkflowContextProvider
            currentScreen={currentScreen}
            totalScreens={totalScreens}
            nextScreen={(data): Promise<void> => {
                updateScreenData(data);
                if (currentScreen === totalScreens - 1) return finishRegistration(data);
                setCurrentScreen((i) => i + 1);
            }}
            previousScreen={(data): void => {
                updateScreenData(data);
                setCurrentScreen((i) => i - 1);
            }}
            screenData={screenData}
            updateScreenData={updateScreenData}
        >
            {showSuccessScreen ? successScreen : screens[currentScreen]}
        </RegistrationWorkflowContextProvider>
    );
};
