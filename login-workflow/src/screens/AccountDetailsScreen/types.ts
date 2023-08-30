import { TextFieldProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type AccountDetailsScreenProps = WorkflowCardProps & {
    /**
     * The label for the first name text field
     */
    firstNameLabel?: string;

    /**
     * The initial value for the first name text field
     */
    initialFirstName?: string;

    /**
     * The function that validates the first name text field
     * @param {string} firstName - validates first name input length
     * @returns boolean | string
     */
    firstNameValidator?: (firstName: string) => boolean | string;

    /**
     * The props to pass to the first name field.
     * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
     */
    firstNameTextFieldProps?: TextFieldProps;

    /**
     * The label for the last name text field
     */
    lastNameLabel?: string;

    /**
     * The initial value for the last name text field
     */
    initialLastName?: string;

    /**
     * The function that validates the last name text field
     * @param {string} lastName - validates last name input length
     * @returns boolean | string
     */
    lastNameValidator?: (lastName: string) => boolean | string;

    /**
     * The props to pass to the last name field.
     * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
     */
    lastNameTextFieldProps?: TextFieldProps;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
