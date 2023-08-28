import { TextFieldProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type CreateAccountScreenProps = WorkflowCardProps & {
    /**
     * @param emailLabel The label for the email field
     * @returns string
     */
    emailLabel?: string;

    /**
     * @param initialValue The initial value for the email text field
     * @returns string
     */
    initialValue?: string;

    /**
     * @param emailValidator The function used to test the input for valid formatting
     * @returns boolean | string
     */
    emailValidator?: (email: string) => boolean | string;

    /**
     * @param emailTextFieldProps The props to pass to the email text field
     * @returns TextFieldProps
     */
    emailTextFieldProps?: TextFieldProps;

    /**
     * @param errorDisplayConfig The configuration for customizing how errors are displayed
     * @returns ErrorManagerProps
     */
    errorDisplayConfig?: ErrorManagerProps;
};
