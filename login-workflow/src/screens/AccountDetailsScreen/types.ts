import { BoxProps, TextFieldProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type AccountDetailsScreenProps = WorkflowCardProps & BoxProps & {
    // used to test the input for valid formatting
    firstNameLabel?: string;
    initialFirstName?: string;
    firstNameValidator?: (firstName: string) => boolean | string;
    firstNameTextFieldProps?: TextFieldProps;

    // used to test the input for valid formatting
    lastNameLabel?: string;
    initialLastName?: string;
    lastNameValidator?: (lastName: string) => boolean | string;
    lastNameTextFieldProps?: TextFieldProps;

    errorDisplayConfig?: ErrorManagerProps;
};
