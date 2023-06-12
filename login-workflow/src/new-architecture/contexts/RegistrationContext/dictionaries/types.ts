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
        };
        SUCCESS_MESSAGE: string;
        SUCCESS_MESSAGE_ALT: string;
        SUCCESS_EXISTING: string;
        FAILURE_MESSAGE: string;
        UNKNOWN_EMAIL: string;
        UNKNOWN_ORGANIZATION: string;
        CREATE_PASSWORD: {
            PASSWORD_INFO: string;
            PASSWORD: string;
            CONFIRM_PASSWORD: string;
            PASS_MATCH_ERROR: string;
        };
    };
    SELF_REGISTRATION: {
        INSTRUCTIONS: string;
        VERIFY_EMAIL: {
            MESSAGE: string;
            RESEND: string;
            VERIFICATION_CODE_PROMPT: string;
            VERIFICATION: string;
        };
    };
    PASSWORD_REQUIREMENTS: {
        LENGTH: string;
        NUMBERS: string;
        UPPER: string;
        LOWER: string;
        SPECIAL: string;
    };
};

export type RegistrationLanguageFile = {
    translation: RegistrationTranslations;
};
