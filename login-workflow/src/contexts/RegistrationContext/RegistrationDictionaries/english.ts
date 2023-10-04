import { RegistrationLanguageFile } from './types';

const resources: RegistrationLanguageFile = {
    translation: {
        REGISTRATION: {
            EULA: {
                LOADING: 'Loading End User License Agreement...',
                AGREE_TERMS: 'I have read and agree to the Terms & Conditions',
            },
            STEPS: {
                CREATE_ACCOUNT: 'Create an Account',
                VERIFY_EMAIL: 'Verify Email',
                LICENSE: 'License Agreement',
                PASSWORD: 'Create Password',
                ACCOUNT_DETAILS: 'Account Details',
                COMPLETE: 'Account Created!',
            },
            INSTRUCTIONS: {
                ACCOUNT_DETAILS: 'Enter your details below to complete account creation.',
                PASSWORD_INFO:
                    'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
            },
            SUCCESS_MESSAGE:
                'Your account has been successfully created with the email <b>{{email}}</b>.\n\nYour account has already been added to the <b>{{organization}}</b> organization.',
            SUCCESS_MESSAGE_ALT:
                'Your account has been successfully created with the email <1>{{email}}</1>.\n\nYour account has already been added to the <3>{{organization}}</3> organization.',
            SUCCESS_MESSAGE_ALT_WITHOUT_EMAIL_PROVIDED:
                'Your account has been successfully created.\n\nYour account has already been added to the <3>{{organization}}</3> organization.',
            SUCCESS_EXISTING:
                'Your account has been successfully created. Please log in with your Eaton account email and password.',
            FAILURE_MESSAGE: 'We were unable to complete your registration.',
            UNKNOWN_EMAIL: 'Unknown Email',
            UNKNOWN_ORGANIZATION: 'Unknown Organization',
        },
        SELF_REGISTRATION: {
            INSTRUCTIONS: `To register for an Eaton account, enter the required information below. You will need to verify your email address to continue.`,
            VERIFY_EMAIL: {
                MESSAGE:
                    'A verification code has been sent to the email address you provided. Click the link or enter the code below to continue. This code is valid for 30 minutes.',
                RESEND: 'Resend Verification Email',
                VERIFICATION_CODE_PROMPT: "Didn't receive an email?",
                VERIFICATION: 'Verification Code',
                CODE_VALIDATOR_ERROR: 'You must provide a valid code',
            },
        },
    },
};
export default resources;
