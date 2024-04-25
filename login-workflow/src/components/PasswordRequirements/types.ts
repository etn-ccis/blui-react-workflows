import { BoxProps } from '@mui/material/Box';
import { PasswordRequirement } from '../SetPassword';

/**
 * Props for PasswordRequirements component.
 */
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
 * Props for PasswordRequirementsCheck component shows whether the status of the password matches the requirements.
 */
export type PasswordRequirementsCheckProps = {
    /**
     * True if the line item should have a blue check (false for gray)
     */
    isChecked: boolean;

    /**
     * The text to display beside the check icon
     */
    label: string;
};
