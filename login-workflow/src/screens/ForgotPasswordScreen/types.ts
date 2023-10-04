import { TextFieldProps } from '@mui/material';
import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { SuccessScreenProps } from '../SuccessScreen';

export type ForgotPasswordScreenProps = WorkflowCardProps & {
    /**
     * label for the textfield
     */
    emailLabel?: string;

    /**
     * used to pre-populate the email input field
     */
    initialEmailValue?: string;

    /**
     * used to test the input for valid formatting
     * @param {string} email - validate format via EMAIL_REGEX
     * @returns boolean | string
     */
    emailValidator?: (email: string) => boolean | string;

    /**
     * used for each slot in `ForgotPasswordScreenBase`
     * @param {SuccessScreenProps} props - pass SuccessScreenProps to SuccessScreen
     * @returns JSX.Element
     */
    slots?: {
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element;
    };

    /**
     * props applied to each slot
     */
    slotProps?: {
        SuccessScreen?: SuccessScreenProps;
    };

    /**
     * used to display contact phone number
     */
    contactPhone?: string;

    /**
     * used to display response time
     */
    responseTime?: string;

    /**
     * used to update the instruction
     * @param {string} responseTime - will add the response time in instructions through desciption function
     * @returns React.ReactNode
     */
    description?: (responseTime: string) => React.ReactNode;

    /**
     * used to determine whether to show a success screen after the form is submitted
     */
    showSuccessScreen?: boolean;

    /**
     * used to configure how errors are rendered
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * The props to pass to the email field.
     * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
     */
    emailTextFieldProps?: TextFieldProps;
};
