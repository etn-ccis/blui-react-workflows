export type AuthTranslations = {
    FORGOT_PASSWORD: {
        ERROR: string;
        INSTRUCTIONS: string;
        INSTRUCTIONS_ALT: string;
        RESET_CODE_ERROR: string;
        LINK_SENT: string;
        LINK_SENT_ALT: string;
        RESPONSE_TIME: string;
    };
    LOGIN: {
        INCORRECT_CREDENTIALS: string;
        INVALID_CREDENTIALS: string;
        GENERIC_ERROR: string;
    };
    PASSWORD_RESET: {
        SUCCESS_MESSAGE: string;
        FAILURE_MESSAGE: string;
    };
    USER_SETTINGS: {
        NAME: string;
        EMAIL: string;
        PHONE_NUMBER: string;
        PASSWORD: string;
        EMAIL_NOTIFICATION: string;
        ENABLED: string;
        ORGANIZATION: string;
        ORGANIZATION_NAME: string;
        ADDRESS: string;
        CHANGE_PASSWORD: string;
        ACCOUNT: string;
    };
    COUNTER: string;
    HEADER: {
        FORGOT_PASSWORD: string;
    };
    ERROR_MESSAGES: {
        '2002': string;
        '9003': string;
    };
    CHANGE_PASSWORD: {
        PASSWORD_CHANGED: string;
        PASSWORD: string;
        SUCCESS_MESSAGE: string;
        EMAIL_CONFIRM_MESSAGE: string;
        PASSWORD_INFO: string;
        OLD_PASSWORD: string;
        ERROR_MESSAGE: string;
        PROBLEM_OCCURRED: string;
        NEW_PASSWORD: string;
        CONFIRM_NEW_PASSWORD: string;
        CANCEL: string;
        UPDATE: string;
    };
    SETTINGS: {
        TITLE: string;
    };
    LEGAL: {
        TITLE: string;
        TERMSANDCONDITIONS: string;
        EULA: string;
        OPENSOURCELICENSES: string;
    };
    USER_MENU: {
        LOG_OUT: string;
        CONTACT_US: string;
        ACCOUNT_SETTING: string;
    };
    CONTACT_SUPPORT: {
        GENERAL_QUESTIONS: string;
        SUPPORT_MESSAGE: string;
        EMERGENCY_SUPPORT: string;
        TECHNICAL_ASSISTANCE: string;
    };
};
export type AuthLanguageFile = {
    translation: AuthTranslations;
};
