import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { SuccessScreenProps } from '../SuccessScreen';

export type ForgotPasswordScreenProps = WorkflowCardProps & {
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

    /**
     * @param emailLabel The label for the email field
     * @returns string
     */
    emailLabel?: string;

    /**
     * @param initialEmailValue The initial value for the email text field
     * @returns string
     */
    initialEmailValue?: string;

    /**
     * @param emailValidator The function used to test the input for valid formatting
     * @returns boolean | string
     */
    emailValidator?: (email: string) => boolean | string;

    /**
     * @param slots Used for ForgotPasswordScreen SuccessScreen
     * @returns JSX.Element
     */
    slots?: {
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element;
    };

    /**
     * @param slotProps Applied to slot from SuccessScreen
     * @returns SuccessScreenProps
     */
    slotProps?: {
        SuccessScreen?: SuccessScreenProps;
    };

    /**
     * @param showSuccessScreen Used to determine whether to show a success screen after the form is submitted
     * @returns boolean
     */
    showSuccessScreen?: boolean;

    /**
     * @param errorDisplayConfig The configuration for customizing how errors are displayed
     * @returns ErrorManagerProps
     */
    errorDisplayConfig?: ErrorManagerProps;
};
