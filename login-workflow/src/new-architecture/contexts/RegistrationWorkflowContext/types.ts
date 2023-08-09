/**
 * @packageDocumentation
 * @module RegistrationWorkflowContext
 */

export type ScreenData = {
    Eula: { accepted: boolean };
    CreateAccount: { emailAddress: string };
    VerifyCode: { code: string };
    CreatePassword: { password: string; confirmPassword: string };
    AccountDetails: { firstName: string; lastName: string; extra?: { [key: string]: boolean | string | number } };
    Other?: { [key: string]: { [key: string]: boolean | string | number } };
};

export type IndividualScreenData =
    | { screenId: 'Eula'; values: ScreenData['Eula']; isAccountExist?: boolean }
    | { screenId: 'CreateAccount'; values: ScreenData['CreateAccount']; isAccountExist?: boolean }
    | { screenId: 'VerifyCode'; values: ScreenData['VerifyCode']; isAccountExist?: boolean }
    | { screenId: 'CreatePassword'; values: ScreenData['CreatePassword']; isAccountExist?: boolean }
    | { screenId: 'AccountDetails'; values: ScreenData['AccountDetails']; isAccountExist?: boolean }
    | { screenId: string; values: { [key: string]: boolean | string | number }; isAccountExist?: boolean };

export type RegistrationWorkflowContextProps = {
    currentScreen: number;
    totalScreens: number;
    nextScreen: (data: IndividualScreenData) => Promise<void>;
    previousScreen: (data: IndividualScreenData) => void;
    screenData: ScreenData;
    updateScreenData: (data: IndividualScreenData) => void;
};
