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
        // eslint-disable-next-line
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

    // used to update the instruction
    description?: (responseTime: string) => React.ReactNode;

    // used to update the screen title
    title?: string;

    // used to display back button
    showBackButton?: boolean;

    // used to display back button label
    backButtonLabel?: string;

    // used to enable to back button
    canGoBack?: boolean | (() => boolean);

    // used to display next button
    showNextButton?: boolean;

    // used to display next button label
    nextButtonLabel?: string;

    // used to enable to next button
    canGoNext?: boolean | (() => boolean);

    // used to determine whether to show a success screen after the form is submitted
    showSuccessScreen?: boolean;

    // used to configure how errors are rendered
    errorDisplayConfig?: ErrorManagerProps;
};
