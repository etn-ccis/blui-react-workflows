import React from 'react';
import { PasswordRequirementsCheck } from './PasswordRequirementsCheck';
import Box, { BoxProps } from '@mui/material/Box';
import { PasswordRequirement } from '../SetPassword';
import { defaultPasswordRequirements } from '../../constants';
import { useTranslation } from 'react-i18next';

export type PasswordRequirementsProps = BoxProps & {
    /**
     * The string to conduct the complexity checks against
     */
    passwordText: string;

    /**
     * Optional requirements to set password
     */
    passwordRequirements?: PasswordRequirement[];
};

/**
 * Component that renders all of the password requirement line items with check indicators.
 *
 * @param {PasswordRequirementsProps} props - props of passwordRequirement component
 *
 * @category Component
 */
export const PasswordRequirements: React.FC<React.PropsWithChildren<PasswordRequirementsProps>> = (props) => {
    const { t } = useTranslation();
    const { passwordText, passwordRequirements = defaultPasswordRequirements(t), sx, ...otherProps } = props;

    return (
        <Box sx={sx} {...otherProps}>
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
