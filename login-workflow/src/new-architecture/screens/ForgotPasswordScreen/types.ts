import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { SuccessScreenProps } from '../SuccessScreen';

export type ForgotPasswordScreenProps = WorkflowCardProps & {
    // label for the textfield
    emailLabel?: string;

    // used to pre-populate the email input field
    initialEmailValue?: string;

    // used to test the input for valid formatting
    emailValidator?: (email: string) => boolean | string;

    // used to handle next button click
    onNext?: (email: string) => boolean | string;

    // used for each slot in `ForgotPasswordScreenBase`
    slots?: {
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element;
    };

    // props applied to each slot
    slotProps?: {
        SuccessScreen?: SuccessScreenProps;
    };

    contactPhone?: string;
};
