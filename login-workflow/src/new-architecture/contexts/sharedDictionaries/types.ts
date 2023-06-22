export type CommonTranslations = {
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
};
export type CommonTranslationsFile = {
    translation: CommonTranslations;
};
