import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type CreateAccountScreenProps = WorkflowCardProps & {
    // label for the textfield
    emailLabel?: string;

    // used to pre-populate the email input field
    initialValue?: string;

    // used to test the input for valid formatting
    emailValidator?: (email: string) => boolean | string;
};
