import { AuthLanguageFile } from './types';

const resources: AuthLanguageFile = {
    translation: {
        FORGOT_PASSWORD: {
            ERROR: 'Could not reset your password at this time.',
            INSTRUCTIONS:
                'Please enter the account email associated with the account.\n\n' +
                'If this email has an account with Eaton, you will receive a response within <b>{{time}}</b>.\n\n' +
                'For urgent account issues, please call {{phone}}.',
            INSTRUCTIONS_ALT:
                'Please enter the account email associated with the account.<br/><br/>' +
                'If this email has an account with Eaton, you will receive a response within <1>{{time}}</1>.<br/><br/>' +
                'For urgent account issues, please call <4>{{phone}}</4>.',
            RESET_CODE_ERROR: 'There was an error with your reset code. ',
            LINK_SENT: 'A link to reset your password has been sent to <b>{{email}}</b>.',
            LINK_SENT_ALT: 'A link to reset your password has been sent to <1>{{email}}</1>.',
            RESPONSE_TIME: 'one business day',
        },
        LOGIN: {
            INCORRECT_CREDENTIALS: 'Incorrect Email or Password',
            INVALID_CREDENTIALS: 'Your username/password combination is not recognized.',
            GENERIC_ERROR: 'Your request could not be processed at this time.',
        },
        PASSWORD_RESET: {
            SUCCESS_MESSAGE: 'Your password was successfully reset.',
            FAILURE_MESSAGE: 'Your password was unable to be reset. Please try again later.',
        },
        USER_SETTINGS: {
            NAME: 'Name',
            EMAIL: 'Email',
            PHONE_NUMBER: 'Phone Number',
            PASSWORD: 'Password',
            EMAIL_NOTIFICATION: 'Email Notification',
            ENABLED: 'Enabled',
            ORGANIZATION: 'Organization',
            ORGANIZATION_NAME: 'Organization Name',
            ADDRESS: 'Address',
            CHANGE_PASSWORD: 'Change Password',
            ACCOUNT: 'Account',
        },
        COUNTER: 'The value is: {{count}}',
        HEADER: {
            FORGOT_PASSWORD: 'Forgot Password',
        },
        ERROR_MESSAGES: {
            '2002': 'User registration link is already redeemed.',
            '9003': 'Requested operation cannot be performed, please contact your administrator',
        },
        CHANGE_PASSWORD: {
            PASSWORD_CHANGED: 'Password Changed',
            PASSWORD: 'Change Password',
            SUCCESS_MESSAGE:
                "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.",
            EMAIL_CONFIRM_MESSAGE: 'We have sent a confirmation email to <b>{{email}}</b>',
            PASSWORD_INFO:
                'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
            OLD_PASSWORD: 'Old Password',
            ERROR_MESSAGE:
                'Your information did not match our records. Please re- enter your information to try again.',
            PROBLEM_OCCURRED: 'A problem occurred:',
            CONFIRM_NEW_PASSWORD: 'Confirm New Password',
            NEW_PASSWORD: 'New Password',
            CANCEL: 'Cancel',
            UPDATE: 'Update',
        },
        SETTINGS: {
            TITLE: 'Settings',
        },
        LEGAL: {
            TITLE: 'Legal',
            TERMSANDCONDITIONS: 'Terms and Conditions',
            EULA: 'End User License Agreement',
            OPENSOURCELICENSES: 'Open Source Licenses',
        },
        USER_MENU: {
            LOG_OUT: 'Log Out',
            CONTACT_US: 'Contact Us',
            ACCOUNT_SETTING: 'Account Settings',
        },
        CONTACT_SUPPORT: {
            GENERAL_QUESTIONS: 'General Questions',
            SUPPORT_MESSAGE: 'For questions, feedback, or support please email us at ',
            EMERGENCY_SUPPORT: 'Emergency Support',
            TECHNICAL_ASSISTANCE: 'For technical support, please call ',
        },
    },
};
export default resources;
