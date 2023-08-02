import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IndividualScreenData, RegistrationWorkflowContextProvider, useRegistrationContext } from '../../contexts';
import {
    AccountDetailsScreen,
    CreateAccountScreen,
    CreatePasswordScreen,
    EulaScreen,
    RegistrationSuccessScreen,
    VerifyCodeScreen,
} from '../../screens';

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
            ? [<EulaScreen />, <CreatePasswordScreen />, <AccountDetailsScreen />]
            : [
                  <EulaScreen />,
                  <CreateAccountScreen />,
                  <VerifyCodeScreen />,
                  <CreatePasswordScreen />,
                  <AccountDetailsScreen />,
              ],
    } = props;

    const useQueryString = (search: string) => {
        let noQuestion = search;
        if (noQuestion.startsWith('?')) noQuestion = noQuestion.substr(1);

        const params = noQuestion.split('&');

        const ret: { [key: string]: string } = {};
        params.forEach((param) => {
            const keyVal = param.split('=', 2);
            if (keyVal.length > 1) {
                ret[keyVal[0]] = decodeURI(keyVal[1]);
            }
        });

        return ret;
    };

    useEffect(() => {
        if (isInviteRegistration) {
            const params = useQueryString(window.location.search);

            updateScreenData({ screenId: 'CreateAccount', values: { emailAddress: params.email } });
            updateScreenData({ screenId: 'VerifyCode', values: { code: params.code } });
        }
    }, []);

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
        console.log('screenData', screenData);
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
