import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { SuccessScreenProps } from '../SuccessScreen';

export type ForgotPasswordScreenProps = WorkflowCardProps & {
    // label for the textfield
    emailLabel?: string;

    // used to pre-populate the email input field
    initialEmailValue?: string;

    // used to test the input for valid formatting
    emailValidator?: (email: string) => boolean | string;

    // used for each slot in `ForgotPasswordScreenBase`
    slots?: {
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element;
    };

    // props applied to each slot
    slotProps?: {
        SuccessScreen?: SuccessScreenProps;
    };

    // used to display contact phone number
    contactPhone?: string;

    // used to display response time
    responseTime?: string;

    // TODO: These need cleaned up to use the WorkflowCardProps instead

    // used to update the instruction
    description?: (responseTime: string) => React.ReactNode;

    // used to determine whether to show a success screen after the form is submitted
    showSuccessScreen?: boolean;

    // used to configure how errors are rendered
    errorDisplayConfig?: ErrorManagerProps;
};
