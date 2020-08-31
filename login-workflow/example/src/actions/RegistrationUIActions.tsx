/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegistrationUIActions, AccountDetailInformation } from '@pxblue/react-auth-workflow';

// Constants
import { SAMPLE_EULA } from '../constants/sampleEula';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

function isRandomFailure(): boolean {
    const randomResponseNumber = getRandomInt(100);
    return false; // randomResponseNumber < 90;
}

/**
 * Example implementation of [[RegistrationUIActions]] to start with during development.
 *
 * Registration Actions to be performed based on the user's actions. The application will create appropriate actions
 * (often API calls, local network storage, credential updates, etc.) based on the actionable needs of the user.
 */
export const ProjectRegistrationUIActions: () => RegistrationUIActions = () => ({
    /**
     * The user wants to complete an action but must first accept the EULA.
     * The application should retrieve an application-specific EULA for the user.
     *
     * @param language  The i18n language the user is requesting for the EULA text.
     *
     * @returns Resolve with EULA, otherwise reject with an error message.
     */
    loadEULA: async (language: string): Promise<string> => {
        await sleep(1000);

        if (isRandomFailure()) {
            throw new Error('Sorry, there was a problem sending your request.');
        }

        if (language !== 'en' && language !== 'en_US') {
            return 'Other language EULA';
        }

        return SAMPLE_EULA;
    },

    /**
     * The user entered their email address and accepted the EULA.
     * The API should now send them an email with the validation code.
     *
     * @param email  Email for the registering user.
     *
     * @returns Resolve when the server accepted the request.
     */
    requestRegistrationCode: async (email: string): Promise<void> => {
        await sleep(800);
        if (isRandomFailure()) {
            throw new Error('Sorry, there was a problem sending your request.');
        }
    },

    /**
     * The user has tapped on an email link inviting them to register with the application.
     * The application should validate the code provided by the link.
     *
     * @param validationCode  Registration code provided from the link.
     * @param validationEmail  Email provided from the invitation email link (optional) `?email=addr%40domain.com`.
     *
     * @returns Resolves when the code is valid. True if registration is complete, False if account information is needed.
     *          If the code is not valid a rejection will occur with an error message.
     */
    validateUserRegistrationRequest: async (validationCode: string, validationEmail?: string): Promise<boolean> => {
        await sleep(800);

        if (isRandomFailure()) {
            throw new Error('Sorry, there was a problem sending your request.');
        }
        return isRandomFailure();
    },
    /**
     * The user has been invited to register and has entered the necessary account and
     * password information.
     * The application should now complete the registration process given the user's data.
     *
     * Note: Upon resolution, the user will be brought back to the Login screen.
     *
     * @param userData  Account details and password entered by the user.
     * @param validationCode  Registration code provided from the invitation email link.
     * @param validationEmail  Email provided from the invitation email link (optional) `?email=addr%40domain.com`.
     *
     * @returns Resolve when account creation succeeds, otherwise reject with an error message.
     */
    completeRegistration: async (
        userData: {
            password: string;
            accountDetails: AccountDetailInformation;
        },
        validationCode: string,
        validationEmail?: string
    ): Promise<{ email: string; organizationName: string }> => {
        const email = 'example@email.com';
        const organizationName = 'Acme Co.';
        const userInfo = { email, organizationName };

        await sleep(1000);
        if (isRandomFailure()) {
            throw new Error('Sorry, there was a problem sending your request.');
        }
        return userInfo;
    },
});
