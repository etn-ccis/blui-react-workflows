/**
 * @packageDocumentation
 * @module RegistrationWorkflowContext
 */

export type ScreenData = {
    Eula: { accepted: boolean };
    CreateAccount: { emailAddress: string };
    VerifyCode: { code: string };
    CreatePassword: { password: string; confirmPassword: string };
    AccountDetails: { firstName: string; lastName: string; extra: { [key: string]: boolean | string | number } };
    Other: { [key: string]: { [key: string]: boolean | string | number } };
};

export type IndividualScreenData =
    | { screenId: 'Eula'; values: ScreenData['Eula'] }
    | { screenId: 'CreateAccount'; values: ScreenData['CreateAccount'] }
    | { screenId: 'VerifyCode'; values: ScreenData['VerifyCode'] }
    | { screenId: 'CreatePassword'; values: ScreenData['CreatePassword'] }
    | { screenId: 'AccountDetails'; values: ScreenData['AccountDetails'] }
    | { screenId: string; values: { [key: string]: boolean | string | number } };

export type RegistrationWorkflowContextProps = {
    currentScreen: number;
    totalScreens: number;
    nextScreen: (data: IndividualScreenData) => void;
    previousScreen: (data: IndividualScreenData) => void;
    screenData: ScreenData;
};
