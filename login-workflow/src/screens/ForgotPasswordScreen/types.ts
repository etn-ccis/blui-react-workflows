import { TextFieldProps } from '@mui/material';
import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { SuccessScreenProps } from '../SuccessScreen';

export type ForgotPasswordScreenProps = WorkflowCardProps & {
    // used to display contact phone number
    contactPhone?: string;

    // used to display response time
    responseTime?: string;

    // TODO: These need cleaned up to use the WorkflowCardProps instead

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
     * The label for the email field
     */
    emailLabel?: string;

    /**
     * The initial value for the email text field
     */
    initialEmailValue?: string;

    /**
     * A function used to test the input for valid formatting
     * @param {string} email - the provided email address
     * @returns boolean | string
     */
    emailValidator?: (email: string) => boolean | string;

    /**
     * Used for ForgotPasswordScreen SuccessScreen
     */
    slots?: {
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element;
    };

    /**
     * Applied to slot from SuccessScreen
     */
    slotProps?: {
        SuccessScreen?: SuccessScreenProps;
    };

    /**
     * Used to determine whether to show a success screen after the form is submitted
     */
    showSuccessScreen?: boolean;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * The props to pass to the email field.
     * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
     */
    emailTextFieldProps?: TextFieldProps;
};
