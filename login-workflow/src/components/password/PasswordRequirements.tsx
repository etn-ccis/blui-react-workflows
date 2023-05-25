import React, { HTMLAttributes } from 'react';
import { useLanguageLocale } from '../../auth-shared';
import { PasswordRequirementsCheck } from './PasswordRequirementsCheck';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { defaultPasswordRequirements, PasswordRequirement } from '../../new-architecture';

export type PasswordRequirementsProps = HTMLAttributes<HTMLDivElement> & {
    passwordText: string;
    passwordRequirements?: PasswordRequirement[];
    sx?: SxProps<Theme>;
};

/**
 * Component that renders all of the password requirement line items with check indicators.
 *
 * @param passwordText The string to conduct the complexity checks against
 *
 * @category Component
 */
export const PasswordRequirements: React.FC<React.PropsWithChildren<PasswordRequirementsProps>> = (props) => {
    const { t } = useLanguageLocale();

    const { passwordText, passwordRequirements = defaultPasswordRequirements(t), ...otherProps } = props;
    return (
        <Box {...otherProps}>
            {passwordRequirements.map((req, ind) => (
                <PasswordRequirementsCheck
                    key={`password_requirement_${ind}`}
                    label={req.description}
                    isChecked={new RegExp(req.regex).test(passwordText)}
                />
            ))}
        </Box>
    );
};
