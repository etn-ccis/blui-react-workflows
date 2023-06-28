/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegistrationUIActions, AccountDetails } from '@brightlayer-ui/react-auth-workflow';

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
    loadEula: async (language: string): Promise<string> => {
        await sleep(1000);

        if (isRandomFailure()) {
            throw new Error('Sorry, there was a problem sending your request.');
        }

        if (!language.includes('en')) {
            return 'Other language EULA';
        }

        return SAMPLE_EULA;
    },

    /**
     * The user accepted the EULA.
     * The API should now update accepted EULA.
     *
     *
     * @returns Resolve when the server accepted the request.
     */
    acceptEula: async (): Promise<boolean> => {
        await sleep(800);
        if (isRandomFailure()) {
            throw new Error('Sorry, there was a problem sending your request.');
        }
        return true;
    },

    /**
     * The user has to fill account details such as first name and last name to register.
     * The API should now update account details.
     * @param details include first name, last name or any other extra details of uset.
     *
     * @returns Resolve when the server can able to update account details, false if not able to update account details with error message.
     */
    setAccountDetails: async (details: AccountDetails): Promise<boolean> => {
        await sleep(800);
        if (isRandomFailure()) {
            throw new Error('Sorry, there was a problem sending your request.');
        }
        return true;
    },

    completeRegistration: async (
        userData: any,
        validationCode: string | number,
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
