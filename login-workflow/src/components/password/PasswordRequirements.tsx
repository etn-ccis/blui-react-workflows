import React, { HTMLAttributes } from 'react';
import { useLanguageLocale } from '../../auth-shared';
import { PasswordRequirementsCheck } from './PasswordRequirementsCheck';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { defaultPasswordRequirements } from '../../new-architecture';

export type PasswordRequirementsProps = HTMLAttributes<HTMLDivElement> & {
    passwordText: string;
    sx?: SxProps<Theme>;
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
    const { passwordText, ...otherProps } = props;
    const { t } = useLanguageLocale();
    const passwordRequirements = defaultPasswordRequirements(t);

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
