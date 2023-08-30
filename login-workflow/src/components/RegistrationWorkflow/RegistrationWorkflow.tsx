import React, { useEffect, useState } from 'react';
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

/**
 * Component that contain the registration workflow and index of screens.
 *
 * @param initialScreenIndex initial screen index to start the registration workflow from
 * @param successScreen success screen to display upon successful registration
 * @param isInviteRegistration boolean when true verifies validateUserRegistrationRequest for verifyCode
 * @param existingAccountSuccessScreen component that displays the success screen
 *
 * @category Component
 */

export type RegistrationWorkflowProps = {
    /**
     * The initial screen index to start the registration workflow from
     */
    initialScreenIndex?: number;

    /**
     * The success screen to display upon successful registration
     */
    successScreen?: JSX.Element;

    /**
     * Boolean when true verifies validateUserRegistrationRequest for verifyCode
     * @default false
     */
    isInviteRegistration?: boolean;

    /**
     * Component that displays the success screen
     */
    existingAccountSuccessScreen?: JSX.Element;
};

export const RegistrationWorkflow: React.FC<React.PropsWithChildren<RegistrationWorkflowProps>> = (props) => {
    const [isAccountExist, setIsAccountExist] = useState(false);
    const {
        initialScreenIndex = 0,
        successScreen = <RegistrationSuccessScreen />,
        existingAccountSuccessScreen = <ExistingAccountSuccessScreen />,
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
            return (
                actions()
                    // TODO: THIS LOOKS BROKEN — ARE WE ONLY PASSING THE DATA FROM THE LAST SCREEN OF THE WORKFLOW???
                    .completeRegistration(
                        data.values,
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
                        // eslint-disable-next-line no-console
                        console.log(_error);
                    })
            );
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
