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

export const VerifyCodeScreenBase: React.FC<React.PropsWithChildren<React.PropsWithChildren<VerifyCodeScreenProps>>> = (
    props
) => {
    const {
        codeValidator = (code: string): boolean | string => {
            if (code?.length > 0) {
                return true;
            }
            return 'You must provide a valid code';
        },
        onResend,
        resendInstructions,
        resendLabel,
        verifyCodeInputLabel,
        initialValue,
        title,
        instructions,
        ...otherProps
    } = props;

    const actionsProps = {
        divider: otherProps.divider,
        canGoNext: otherProps.canGoNext,
        canGoPrevious: otherProps.canGoPrevious,
        showPrevious: otherProps.showPrevious,
        showNext: otherProps.showNext,
        previousLabel: otherProps.previousLabel,
        nextLabel: otherProps.nextLabel,
        onPrevious: otherProps.onPrevious,
        onNext: otherProps.onNext,
        currentStep: otherProps.currentStep,
        totalSteps: otherProps.totalSteps,
        fullWidthButton: otherProps.fullWidthButton,
        // @TODO: should we extend the rest of the props (CardActionsProps) or should we set this up to take in each sections props separately e.g., workflowCardProps, actionsProps, etc.
    };

    const [verifyCode, setVerifyCode] = React.useState(initialValue ?? '');
    const [shouldValidateCode, setShouldValidateCode] = React.useState(false);
    const [isCodeValid, setIsCodeValid] = React.useState(codeValidator(initialValue) ?? false);
    const [codeError, setCodeError] = React.useState('');

    const handleVerifyCodeInputChange = useCallback(
        (code: string) => {
            setVerifyCode(code);
            const validatorResponse = codeValidator(code);

            if (typeof validatorResponse === 'boolean' && validatorResponse === true) {
                setIsCodeValid(true);
                setCodeError('');
            } else if (typeof validatorResponse === 'boolean' && validatorResponse === false) {
                setIsCodeValid(false);
                setCodeError('');
            } else if (typeof validatorResponse === 'string') {
                setIsCodeValid(false);
                setCodeError(validatorResponse);
            }
        },
        [codeValidator]
    );

    return (
        <WorkflowCard>
            <WorkflowCardHeader title={title}></WorkflowCardHeader>
            <WorkflowCardBody>
                <WorkflowCardInstructions divider instructions={instructions}></WorkflowCardInstructions>
                <TextField
                    label={verifyCodeInputLabel}
                    fullWidth
                    value={verifyCode}
                    onChange={(evt): void => {
                        handleVerifyCodeInputChange(evt.target.value);
                    }}
                    onKeyPress={(e): void => {
                        if (e.key === 'Enter' && props.onNext) props.onNext();
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
            <WorkflowCardActions {...actionsProps} divider></WorkflowCardActions>
        </WorkflowCard>
    );
};
