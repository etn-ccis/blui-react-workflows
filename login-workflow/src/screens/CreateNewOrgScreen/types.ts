import { TextFieldProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type CreateNewOrgScreenProps = WorkflowCardProps & {
    /**
     * The label for the organization name field
     */
    orgNameLabel?: string;

    /**
     * The initial value for the organization name text field
     */
    initialValue?: string;

    /**
     * The function used to test the organization name input for valid formatting
     * @param {string} orgName
     * @returns boolean | string
     */
    orgNameValidator?: (orgName: string) => boolean | string;

    /**
     * The props to pass to the organization name text field.
     * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
     */
    orgNameTextFieldProps?: TextFieldProps;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
