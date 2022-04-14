import React, { HTMLAttributes } from 'react';
import { useInjectedUIContext, useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import { PasswordRequirementsCheck } from './PasswordRequirementsCheck';
import { defaultPasswordRequirements } from '../../constants';

export type PasswordRequirementsProps = HTMLAttributes<HTMLDivElement> & {
    passwordText: string;
};

/**
 * Component that renders all of the password requirement line items with check indicators.
 *
 * @param passwordText The string to conduct the complexity checks against
 *
 * @category Component
 */
export const PasswordRequirements: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<PasswordRequirementsProps>>
> = (props) => {
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
