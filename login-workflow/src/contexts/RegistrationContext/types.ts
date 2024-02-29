import { i18n } from 'i18next';
import { ErrorContextProviderProps } from '../ErrorContext';
import { RouteConfig } from '../../types';

export type AccountDetails = {
    firstName: string;
    lastName: string;
    extra?: { [key: string]: boolean | string | number };
};

// this should be updated to add new actions for greater control
export type RegistrationUIActions = {
    /**
     * A function that is used to load the EULA.
     * @param {string} language - This function will be called when the user lands on the EULA screen
     * @returns Promise<string>
     */
    loadEula?: (language: string) => Promise<string>;

    /**
     * A function that is used to accept the EULA. This function will be called when the user clicks the Next button on the EULA screen
     * @returns Promise<void>
     */
    acceptEula?: () => Promise<void>;

    /**
     * A function that is used to request a registration code.
     * @param {string} email - This function will be called when the user lands on the Verify Code screen as well as when a user clicks the Resend Verification Code button
     * @returns Promise<string>
     */
    requestRegistrationCode?: (email: string) => Promise<string>;

    /**
     * A function that is used to validate a registration code. This function will be called when the user clicks the Next button on the Verify Code screen screen
     * @param {string} validationCode - the provided verification code
     * @param {string} validationEmail - the provided email address
     * @returns Promise<boolean>
     */
    validateUserRegistrationRequest?: (
        validationCode: string,
        validationEmail?: string
    ) => Promise<{ codeValid: boolean | string; accountExists?: boolean }>;

    /**
     * A function that is used to create a password. This function will be called when the user clicks the Next button on the Create Password screen
     * @param {string} password - the provided password
     * @returns Promise<boolean>
     */
    createPassword?: (password: string) => Promise<boolean>;

    /**
     * A function that is used to set the account details. This function will be called when the user clicks the Next button on the Account Details screen
     * @param {AccountDetails} details - information collected from the screen, including firstName and lastName
     * @returns Promise<boolean>
     */
    setAccountDetails?: (details: AccountDetails) => Promise<boolean>;

    /**
     * A function that is used to complete the registration. This function will be called when the user clicks the Next button on the final registration workflow screen
     * @param {string} email - Used to display on final screen
     * @param {string} organizationName - Used to display on final screen
     * @returns Promise<{ email: string; organizationName: string }>
     */
    completeRegistration?: (userData: object) => Promise<{ email: string; organizationName: string }>;
};

export type RegistrationContextProviderProps = {
    /**
     * An object of functions that are used to manage the authentication workflow
     * @returns RegistrationUIActions
     */
    actions?: RegistrationUIActions;

    /**
     * The language code specifying which language to use for the UI
     */
    language: string;

    /**
     * A function that is used to navigate to a new URL. This is used to navigate to the various screens of the workflow
     */
    navigate: (destination: -1 | string) => void;

    /**
     * An object that defines the various routes for the workflow
     */
    routeConfig: RouteConfig;

    /**
     * An optional i18n object that is used to translate the UI. This is only needed if you want to use custom translation keys / languages inside any of the workflow screens
     */
    i18n?: i18n; // add languages / override strings in bulk

    /**
     * An object that is used to configure error handling within the workflow.
     */
    errorConfig?: ErrorContextProviderProps;
};
