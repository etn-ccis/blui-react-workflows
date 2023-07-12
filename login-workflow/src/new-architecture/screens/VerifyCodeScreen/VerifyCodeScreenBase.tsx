import React, { useCallback } from 'react';
import { VerifyCodeScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardActions } from '../../components/WorkflowCard/WorkflowCardActions';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { WorkflowCardHeader } from '../../components/WorkflowCard/WorkflowCardHeader';
import { WorkflowCardInstructions } from '../../components/WorkflowCard/WorkflowCardInstructions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Component that renders a screen that prompts a user to enter the confirmation code
 * that was sent to the email address that they used to register.
 *
 * @param codeValidator used to test the input for valid formatting
 * @param onResend function to call when the user clicks the 'resend code' button
 * @param resendInstructions text to display ahead of the resend link/button
 * @param resendLabel label for the resend link/button
 * @param initialValue code used to pre-populate the field
 *
 * @category Component
 */

export const VerifyCodeScreenBase: React.FC<React.PropsWithChildren<VerifyCodeScreenProps>> = (props) => {
    const { codeValidator, onResend, resendInstructions, resendLabel, verifyCodeInputLabel, initialValue } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [verifyCode, setVerifyCode] = React.useState(initialValue ?? '');
    const [shouldValidateCode, setShouldValidateCode] = React.useState(false);
    const [isCodeValid, setIsCodeValid] = React.useState(codeValidator ? codeValidator(initialValue) : false);
    const [codeError, setCodeError] = React.useState('');

    const handleVerifyCodeInputChange = useCallback(
        (code: string) => {
            setVerifyCode(code);
            if (codeValidator) {
                const validatorResponse = codeValidator(code);
                setIsCodeValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
                setCodeError(typeof validatorResponse === 'string' ? validatorResponse : '');
            }
        },
        [codeValidator]
    );

    const handleOnNext = (): void => {
        const { onNext } = actionsProps;
        if (onNext) onNext({ code: verifyCode });
    };

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps}></WorkflowCardHeader>
            <WorkflowCardBody>
                <WorkflowCardInstructions {...instructionsProps} divider />
                <TextField
                    label={verifyCodeInputLabel}
                    fullWidth
                    value={verifyCode}
                    onChange={(evt): void => {
                        handleVerifyCodeInputChange(evt.target.value);
                    }}
                    onKeyUp={(e): void => {
                        if (e.key === 'Enter' && verifyCode.length > 0 && isCodeValid && actionsProps.canGoNext)
                            handleOnNext();
                    }}
                    variant="filled"
                    error={shouldValidateCode && !isCodeValid}
                    helperText={shouldValidateCode && codeError}
                    onBlur={(): void => setShouldValidateCode(true)}
                />
                <Box sx={{ mt: 2 }}>
                    <Typography>
                        {resendInstructions}
                        <Typography
                            sx={{ fontSize: 'inherit', textTransform: 'initial', '&:hover': { cursor: 'pointer' } }}
                            onClick={(): void => onResend()}
                            color="primary"
                            variant={'button'}
                        >
                            {' '}
                            <u>{resendLabel}</u>
                        </Typography>
                    </Typography>
                </Box>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                divider
                canGoNext={verifyCode.length > 0 && isCodeValid && actionsProps.canGoNext}
                onNext={handleOnNext}
            />
        </WorkflowCard>
    );
};
