import { SxProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { MinifiedTextFieldProps } from '../../types';
import { ErrorManagerProps } from '../../components/Error';

export type AccountDetailsScreenProps = WorkflowCardProps & {
    // used to test the input for valid formatting
    firstNameLabel?: string;
    initialFirstName?: string;
    firstNameValidator?: (firstName: string) => boolean | string;
    firstNameTextFieldProps?: MinifiedTextFieldProps;

    // used to test the input for valid formatting
    lastNameLabel?: string;
    initialLastName?: string;
    lastNameValidator?: (lastName: string) => boolean | string;
    lastNameTextFieldProps?: MinifiedTextFieldProps;

    errorDisplayConfig?: ErrorManagerProps;
    sx?: SxProps;
};
