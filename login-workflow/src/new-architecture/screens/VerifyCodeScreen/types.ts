import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type VerifyCodeScreenProps = WorkflowCardProps & { 
        
    // used to test the input for valid formatting
    codeValidator?: (code: string) => boolean | string;
   
    // called when the resend link/button is clicked
    onResend?: () => void;

    // text to display ahead of the resend link/button
    resendInstructions?: string;

    // label for the resend link/button
    resendLabel?: string;

    // used to pre-populate the data in the field when the screen loads
    initialValue?: string;

    // used to set the label for verify code input
    verifyCodeInputLabel?: string;
}