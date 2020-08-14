import React, { HTMLAttributes } from 'react';
import { PasswordRequirementsCheck } from './PasswordRequirementsCheck';
import {
    PasswordRequirement,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
    SPECIAL_CHAR_REGEX,
    useInjectedUIContext,
    useLanguageLocale,
} from '@pxblue/react-auth-shared';

export type PasswordRequirementsProps = HTMLAttributes<HTMLDivElement> & {
    passwordText: string;
};

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = (props) => {
    const { passwordText, ...divProps } = props;
    const { t } = useLanguageLocale();
    const defaultRequirements: PasswordRequirement[] = [
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

    const { passwordRequirements = defaultRequirements } = useInjectedUIContext();

    return (
        <div {...divProps}>
            {passwordRequirements.map((req, ind) => (
                <PasswordRequirementsCheck
                    key={`password_requirement_${ind}`}
                    label={req.description}
                    isChecked={new RegExp(req.regex).test(passwordText)}
                />
            ))}
        </div>
    );
};
