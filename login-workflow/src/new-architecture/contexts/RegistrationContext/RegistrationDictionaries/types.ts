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
    };
};

export type RegistrationLanguageFile = {
    translation: RegistrationTranslations;
};
