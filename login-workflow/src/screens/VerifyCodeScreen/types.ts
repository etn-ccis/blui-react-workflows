import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type VerifyCodeScreenProps = WorkflowCardProps & {
    /**
     * The function that validates the code text field
     * @param {string} code - validates code input length
     * @returns boolean | string
     */
    codeValidator?: (code: string) => boolean | string;

    /**
     * The function that is called when the resend link/button is clicked
     * @returns void
     */
    onResend?: () => void;

    /**
     * The text to display ahead of the resend link/button
     */
    resendInstructions?: string;

    /**
     * The text to display for the resend link/button
     */
    resendLabel?: string;

    /**
     * The initial value for the code text field
     */
    initialValue?: string;

    /**
     * The label for the code text field
     */
    verifyCodeInputLabel?: string;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
