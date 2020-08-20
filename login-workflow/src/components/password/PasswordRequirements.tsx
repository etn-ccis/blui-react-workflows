import React, { HTMLAttributes } from 'react';
import { PasswordRequirementsCheck } from './PasswordRequirementsCheck';
import { useInjectedUIContext, useLanguageLocale } from '@pxblue/react-auth-shared';
import { defaultPasswordRequirements } from '../../constants';

export type PasswordRequirementsProps = HTMLAttributes<HTMLDivElement> & {
    passwordText: string;
};

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = (props) => {
    const { passwordText, ...divProps } = props;
    const { t } = useLanguageLocale();
    const { passwordRequirements = defaultPasswordRequirements(t) } = useInjectedUIContext();

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
