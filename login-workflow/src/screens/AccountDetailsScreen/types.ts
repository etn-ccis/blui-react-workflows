import { SxProps, TextFieldProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type AccountDetailsScreenProps = WorkflowCardProps & {
    /**
     * @param firstNameLabel The label for the first name text field
     * @returns string
     */
    firstNameLabel?: string;

    /**
     * @param initialFirstName The initial value for the first name text field
     * @returns string
     */
    initialFirstName?: string;

    /**
     * @param firstNameValidator The function that validates the first name text field
     * @returns boolean | string
     */
    firstNameValidator?: (firstName: string) => boolean | string;

    /**
     * @param firstNameTextFieldProps The props to pass to the first name field
     * @returns TextFieldProps
     */
    firstNameTextFieldProps?: TextFieldProps;

    /**
     * @param lastNameLabel The label for the last name text field
     * @returns string
     */
    lastNameLabel?: string;

    /**
     * @param initialLastName The initial value for the last name text field
     * @returns string
     */
    initialLastName?: string;

    /**
     * @param lastNameValidator The function that validates the last name text field
     * @returns boolean | string
     */
    lastNameValidator?: (lastName: string) => boolean | string;

    /**
     * @param lastNameTextFieldProps The props to pass to the last name field
     * @returns TextFieldProps
     */
    lastNameTextFieldProps?: TextFieldProps;

    /**
     * @param errorDisplayConfig The configuration for customizing how errors are displayed
     * @returns ErrorManagerProps
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * @param sx The styles applied to text field
     * @returns SxProps
     */
    sx?: SxProps;
};
