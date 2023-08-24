import React, { cloneElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IndividualScreenData, RegistrationWorkflowContextProvider, useRegistrationContext } from '../../contexts';
import {
    AccountDetailsScreen,
    CreateAccountScreen,
    CreatePasswordScreen,
    EulaScreen,
    ExistingAccountSuccessScreen,
    RegistrationSuccessScreen,
    VerifyCodeScreen,
} from '../../screens';
import { parseQueryString } from '../../utils';

export type RegistrationWorkflowProps = {
    initialScreenIndex?: number;
    successScreen?: JSX.Element;
    isInviteRegistration?: boolean;
    existingAccountSuccessScreen?: JSX.Element;
};

export const RegistrationWorkflow: React.FC<React.PropsWithChildren<RegistrationWorkflowProps>> = (props) => {
    const [isAccountExist, setIsAccountExist] = useState(false);
    const navigate = useNavigate();

    const {
        initialScreenIndex = 0,
        successScreen = <RegistrationSuccessScreen />,
        existingAccountSuccessScreen = <ExistingAccountSuccessScreen />,
        isInviteRegistration = false,
        children,
    } = props;

    let screens;

    if (children) {
        screens = [...(Array.isArray(children) ? children : [children])];
        const overrideElement = cloneElement(screens[0], {
            WorkflowCardActionsProps: {
                onPrevious: () => {
                    navigate(-1);
                },
            },
        });
        screens[0] = overrideElement;
    } else {
        const defaultChildren = isInviteRegistration
            ? [
                  <EulaScreen key="EulaScreen" WorkflowCardActionsProps={{ onPrevious: () => navigate(-1) }} />,
                  <CreatePasswordScreen key="CreatePasswordScreen" />,
                  <AccountDetailsScreen key="AccountDetailsScreen" />,
              ]
            : [
                  <EulaScreen key="EulaScreen" WorkflowCardActionsProps={{ onPrevious: () => navigate(-1) }} />,
                  <CreateAccountScreen key="CreateAccountScreen" />,
                  <VerifyCodeScreen key="VerifyCodeScreen" />,
                  <CreatePasswordScreen key="CreatePasswordScreen" />,
                  <AccountDetailsScreen key="AccountDetailsScreen" />,
              ];

        screens = defaultChildren;
    }

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
            isAccountExist: false,
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
                if (data.isAccountExist) {
                    setIsAccountExist(true);
                    setShowSuccessScreen(true);
                }
                if (currentScreen === totalScreens - 1) return finishRegistration(data);
                setCurrentScreen((i) => i + 1);
            }}
            previousScreen={(data): void => {
                updateScreenData(data);
                setCurrentScreen((i) => i - 1);
            }}
            screenData={screenData}
            updateScreenData={updateScreenData}
            isInviteRegistration={isInviteRegistration}
        >
            {showSuccessScreen
                ? isAccountExist
                    ? existingAccountSuccessScreen
                    : successScreen
                : screens[currentScreen]}
        </RegistrationWorkflowContextProvider>
    );
};
