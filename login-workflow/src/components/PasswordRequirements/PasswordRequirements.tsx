import React, { HTMLAttributes } from 'react';
import { PasswordRequirementsCheck } from './PasswordRequirementsCheck';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { PasswordRequirement } from '../SetPassword';
import { useLanguageLocale } from '../../hooks';
import { defaultPasswordRequirements } from '../../constants';

export type PasswordRequirementsProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * @param passwordText The string to conduct the complexity checks against
     * @returns string
     */
    passwordText: string;

    /**
     * @param passwordRequirements Optional requirements to set password
     * @returns PasswordRequirement array
     */
    passwordRequirements?: PasswordRequirement[];

    /**
     * @param sx The styles passed to the underlying root component
     * @returns string
     */
    sx?: SxProps<Theme>;
};

/**
 * Component that renders all of the password requirement line items with check indicators.
 *
 * @param passwordText The string to conduct the complexity checks against
 * @param passwordRequirements Optional requirements to set password
 * @param sx styles passed to the underlying root component
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
