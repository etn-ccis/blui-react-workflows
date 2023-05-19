import { TextFieldProps } from '@mui/material/TextField';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type AccountDetailsScreenProps = WorkflowCardProps & {
    // used to test the input for valid formatting
    firstNameLabel?: string;
    initialFirstName?: string;
    firstNameValidator?: (firstName: string) => boolean | string;
    firstNameTextFieldProps?: Omit<TextFieldProps, 'label' | 'inputRef' | 'value' | 'onChange' | 'onKeyPress'>;

    // used to test the input for valid formatting
    lastNameLabel?: string;
    initialLastName?: string;
    lastNameValidator?: (lastName: string) => boolean | string;
    lastNameTextFieldProps?: Omit<TextFieldProps, 'label' | 'inputRef' | 'value' | 'onChange' | 'onKeyPress'>;
};
