export type AuthTranslations = {
    ACTIONS: {
        FINISH: string;
        NEXT: string;
        BACK: string;
        CREATE_ACCOUNT: string;
        OKAY: string;
        CANCEL: string;
        CONTINUE: string;
        DONE: string;
        LOG_IN: string;
        LOG_OUT: string;
        CLICK_BUTTON: string;
        UPDATE_REDUX: string;
        CHANGE_LANGUAGE: string;
        GO_HOME: string;
        GO_TEST: string;
        RESEND: string;
        UPDATE: string;
        REMEMBER: string;
    };
    LABELS: {
        EMAIL: string;
        USERNAME: string;
        PASSWORD: string;
        CURRENT_PASSWORD: string;
        NEW_PASSWORD: string;
        OPTIONAL: string;
        FORGOT_PASSWORD: string;
        NEED_ACCOUNT: string;
        VIEW_ALL_EVENTS: string;
    };
    MESSAGES: {
        EMAIL_SENT: string;
        WELCOME: string;
        WELCOME_PROJECT: string;
        LOGIN_MESSAGE: string;
        CONGRATS: string;
        CONTACT: string;
        ERROR: string;
        EMAIL_ENTRY_ERROR: string;
        USERNAME_ENTRY_ERROR: string;
        SUCCESS: string;
        FAILURE: string;
        LOADING: string;
        REQUEST_ERROR: string;
    };
    FORGOT_PASSWORD: {
        ERROR: string;
        INSTRUCTIONS: string;
        INSTRUCTIONS_ALT: string;
        RESET_CODE_ERROR: string;
        LINK_SENT: string;
        LINK_SENT_ALT: string;
    };
    LOGIN: {
        INCORRECT_CREDENTIALS: string;
        INVALID_CREDENTIALS: string;
        GENERIC_ERROR: string;
    };
    FORMS: {
        FIRST_NAME: string;
        LAST_NAME: string;
        PHONE_NUMBER: string;
        PASSWORD: string;
        CONFIRM_PASSWORD: string;
        PASS_MATCH_ERROR: string;
        TOGGLE_PASSWORD_VISIBILITY: string;
        RESET_PASSWORD: string;
    };
    PASSWORD_REQUIREMENTS: {
        LENGTH: string;
        NUMBERS: string;
        UPPER: string;
        LOWER: string;
        SPECIAL: string;
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
