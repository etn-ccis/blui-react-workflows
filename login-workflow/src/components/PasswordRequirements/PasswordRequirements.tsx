import React, { HTMLAttributes } from 'react';
import { PasswordRequirementsCheck } from './PasswordRequirementsCheck';
import Box, { BoxProps } from '@mui/material/Box';
import { PasswordRequirement } from '../SetPassword';
import { useLanguageLocale } from '../../hooks';
import { defaultPasswordRequirements } from '../../constants';

export type PasswordRequirementsProps = HTMLAttributes<HTMLDivElement> &
    BoxProps & {
        passwordText: string;
        passwordRequirements?: PasswordRequirement[];
    };

/**
 * Component that renders all of the password requirement line items with check indicators.
 *
 * @param passwordText The string to conduct the complexity checks against
 * @param passwordRequirements Optional requirements to set password
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
