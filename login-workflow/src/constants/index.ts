import {
    PasswordRequirement,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
    SPECIAL_CHAR_REGEX,
} from '@pxblue/react-auth-shared';
export const defaultPasswordRequirements = (t: (input: string) => string): PasswordRequirement[] => [
    {
        regex: LENGTH_REGEX,
        description: t('PASSWORD_REQUIREMENTS.LENGTH'),
    },
    {
        regex: NUMBERS_REGEX,
        description: t('PASSWORD_REQUIREMENTS.NUMBERS'),
    },
    {
        regex: UPPER_CASE_REGEX,
        description: t('PASSWORD_REQUIREMENTS.UPPER'),
    },
    {
        regex: LOWER_CASE_REGEX,
        description: t('PASSWORD_REQUIREMENTS.LOWER'),
    },
    {
        regex: SPECIAL_CHAR_REGEX,
        description: t('PASSWORD_REQUIREMENTS.SPECIAL'),
    },
];
