import React, { useState } from 'react';
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
    inviteCode?: any;
    inviteEmail?: any;
};

export const RegistrationWorkflow: React.FC<React.PropsWithChildren<RegistrationWorkflowProps>> = (props) => {
    const {
        initialScreenIndex = 0,
        successScreen = <RegistrationSuccessScreen />,
        isInviteRegistration = false,
        inviteCode = '',
        inviteEmail = '',
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

    // const [code, setCode] = useState('');
    // const [email, setEmail] = useState('');

    // const useQueryString = (search: any) => {
    //     let noQuestion = search;
    //     if (noQuestion.startsWith('?')) noQuestion = noQuestion.substr(1);

    //     const params = noQuestion.split('&');

    //     const ret: { [key: string]: string } = {};
    //     params[0];
    //     params.forEach((param: any) => {
    //         const keyVal = param.split('=', 2);
    //         if (keyVal.length > 1) {
    //             ret[keyVal[0]] = decodeURI(keyVal[1]);
    //         }
    //     });

    //     return ret;
    // };
    // const params = useQueryString(window.location.search);
    // if (isInviteRegistration) {
    //     setCode(params.code);
    //     setEmail(params.email);
    // }
    // console.log('location', window.location, params);
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
            emailAddress: isInviteRegistration ? inviteEmail : '',
        },
        VerifyCode: {
            code: isInviteRegistration ? inviteCode : '',
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
