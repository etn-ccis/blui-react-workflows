export type RegistrationTranslations = {
    REGISTRATION: {
        EULA: {
            LOADING: string;
            AGREE_TERMS: string;
        };
        STEPS: {
            CREATE_ACCOUNT: string;
            VERIFY_EMAIL: string;
            LICENSE: string;
            PASSWORD: string;
            ACCOUNT_DETAILS: string;
            COMPLETE: string;
        };
        INSTRUCTIONS: {
            ACCOUNT_DETAILS: string;
            PASSWORD_INFO: string;
        };
        SUCCESS_MESSAGE: string;
        SUCCESS_MESSAGE_ALT: string;
        SUCCESS_MESSAGE_ALT_WITHOUT_EMAIL_PROVIDED: string;
        SUCCESS_EXISTING: string;
        FAILURE_MESSAGE: string;
        UNKNOWN_EMAIL: string;
        UNKNOWN_ORGANIZATION: string;
    };
    SELF_REGISTRATION: {
        INSTRUCTIONS: string;
        VERIFY_EMAIL: {
            MESSAGE: string;
            RESEND: string;
            VERIFICATION_CODE_PROMPT: string;
            VERIFICATION: string;
            CODE_VALIDATOR_ERROR: string;
        };
        NEW_ORG?: {
            SCREEN_TITLE: string;
            MESSAGE_1: string;
            MESSAGE_2: string;
            MESSAGE_3: string;
            ORG_NAME_ENTRY_ERROR: string;
        };
    };
};

export type RegistrationLanguageFile = {
    translation: RegistrationTranslations;
};
