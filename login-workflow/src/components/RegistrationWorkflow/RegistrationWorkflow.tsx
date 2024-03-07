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
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import ErrorManager, { ErrorManagerProps } from '../Error/ErrorManager';

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
     * When true verifies validateUserRegistrationRequest for verifyCode and several of the default screens will be skipped
     * not requiring user input for email and the validation code will be pulled from the url
     * @default false
     */
    isInviteRegistration?: boolean;

    /**
     * Component to display for the success screen if the account already exists.
     */
    existingAccountSuccessScreen?: JSX.Element;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};

export const RegistrationWorkflow: React.FC<React.PropsWithChildren<RegistrationWorkflowProps>> = (props) => {
    const { errorDisplayConfig: registrationWorkflowErrorConfig } = props;
    const [isAccountExist, setIsAccountExist] = useState(false);
    const { triggerError, errorManagerConfig: globalErrorManagerConfig } = useErrorManager();
    const { actions, navigate } = useRegistrationContext();
    const {
        messageBoxConfig: workflowMessageBoxConfig,
        dialogConfig: workflowDialogConfig,
        onClose: workflowOnClose,
        ...otherWorkflowErrorConfig
    } = registrationWorkflowErrorConfig ?? {};
    const {
        messageBoxConfig: globalMessageBoxConfig,
        dialogConfig: globalDialogConfig,
        onClose: globalOnClose,
        ...otherGlobalErrorConfig
    } = globalErrorManagerConfig;

    const errorDisplayConfig: ErrorManagerProps = {
        messageBoxConfig: { ...globalMessageBoxConfig, ...workflowMessageBoxConfig },
        dialogConfig: { ...globalDialogConfig, ...workflowDialogConfig },
        onClose: (): void => {
            workflowOnClose?.();
            globalOnClose?.();
        },

        ...otherGlobalErrorConfig,
        ...otherWorkflowErrorConfig,
    };
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
        const { Other }: { [key: string]: any } = screenData;
        const { screenId, values, isAccountExist: accountExists } = data;

        if (accountExists) {
            setIsAccountExist(accountExists);
            setShowSuccessScreen(accountExists);
        }

        if (!Object.keys(screenData).includes(screenId)) {
            setScreenData((oldData) => ({
                ...oldData,
                Other: { ...oldData.Other, [screenId]: values },
            }));
        } else if (Object.keys(Other).includes(screenId)) {
            setScreenData((oldData) => ({
                ...oldData,
                Other: { ...Other, [screenId]: { ...Other[screenId], ...values } },
            }));
        } else {
            setScreenData((oldData) => ({
                ...oldData,
                [screenId]: values,
            }));
        }
    };

    const finishRegistration = async (data: IndividualScreenData): Promise<void> => {
        try {
            if (actions && actions.completeRegistration) {
                const { Eula, CreateAccount, VerifyCode, CreatePassword, AccountDetails, Other } = screenData;
                const userInfo = {
                    ...Eula,
                    ...CreateAccount,
                    ...VerifyCode,
                    ...CreatePassword,
                    ...AccountDetails,
                    ...Other,
                    ...data.values,
                };
                return await actions
                    .completeRegistration(userInfo)
                    .then(({ email, organizationName }) => {
                        updateScreenData({
                            screenId: 'RegistrationSuccessScreen',
                            values: { email, organizationName },
                        });
                        setShowSuccessScreen(true);
                    })
                    .catch((_error) => {
                        triggerError(_error);
                    });
            }
        } catch (err) {
            console.error(err);
        }
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
            nextScreen={(data): Promise<void> | undefined => {
                try {
                    updateScreenData(data);
                    if (data.isAccountExist) {
                        setIsAccountExist(true);
                        setShowSuccessScreen(true);
                    }
                    if (currentScreen === totalScreens - 1) return finishRegistration(data);
                    setCurrentScreen((i) => i + 1);
                } catch (_error) {
                    triggerError(_error as Error);
                }
            }}
            previousScreen={(data): void => {
                updateScreenData(data);
                if (currentScreen === 0) {
                    navigate(-1);
                }
                setCurrentScreen((i) => i - 1);
            }}
            screenData={screenData}
            updateScreenData={updateScreenData}
            isInviteRegistration={isInviteRegistration}
        >
            <ErrorManager {...errorDisplayConfig} mode="dialog">
                {showSuccessScreen
                    ? isAccountExist
                        ? existingAccountSuccessScreen
                        : successScreen
                    : screens[currentScreen]}
            </ErrorManager>
        </RegistrationWorkflowContextProvider>
    );
};
