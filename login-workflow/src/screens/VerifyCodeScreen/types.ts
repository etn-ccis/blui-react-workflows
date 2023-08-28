import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type VerifyCodeScreenProps = WorkflowCardProps & {
    /**
     * @param codeValidator The function that validates the code text field
     * @returns boolean | string
     */
    codeValidator?: (code: string) => boolean | string;

    /**
     * @param onResend The function that is called when the resend link/button is clicked
     * @returns void
     */
    onResend?: () => void;

    /**
     * @param resendInstructions The text to display ahead of the resend link/button
     * @returns string
     */
    resendInstructions?: string;

    /**
     * @param resendLabel The text to display for the resend link/button
     * @returns string
     */
    resendLabel?: string;

    /**
     * @param initialValue The initial value for the code text field
     * @returns string
     */
    initialValue?: string;

    /**
     * @param verifyCodeInputLabel The label for the code text field
     * @returns string
     */
    verifyCodeInputLabel?: string;

    /**
     * @param errorDisplayConfig The configuration for customizing how errors are displayed
     * @returns ErrorManagerProps
     */
    errorDisplayConfig?: ErrorManagerProps;
};
