import React, { useEffect } from 'react';
import { useLanguageLocale } from '../../../auth-shared';
import { useTheme } from '@mui/material/styles';
import { VerifyCodeScreenProps } from './types'
import {
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardInstructions,
    WorkflowCardBody,
    WorkflowCardActions
} from '../../components/WorkflowCard/WorkflowCardPlaceholders';
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

export const VerifyCodeScreenBase: React.FC<React.PropsWithChildren<React.PropsWithChildren<VerifyCodeScreenProps>>> = (props) => {
    const { codeValidator, onResend, resendInstructions, resendLabel, verifyCodeInputLabel, initialValue, ...otherProps } = props;
    const workflowCardActionsProps = {
        canGoNext: props.canGoNext,
        canGoPrevious: props.canGoPrevious,
        showPrevious: props.showPrevious,
        showNext: props.showNext,
        previousLabel: props.previousLabel,
        nextLabel: props.nextLabel,
        onPrevious: props.onPrevious,
        onNext: props.onNext,
        currentStep: props.currentStep,
        totalSteps: props.totalSteps,
        fullWidthButton: props.fullWidthButton,
    }

    const WorkflowCardBaseProps = {
        loading: props.loading,
        background: props.background, // card background
        error: props.error,
    }
    const theme = useTheme();
    const { t } = useLanguageLocale();

    const [verifyCode, setVerifyCode] = React.useState(initialValue ?? '');
    const [isCodeValid, setIsCodeValid] = React.useState(codeValidator(initialValue) ?? false)

    useEffect(() => {
        setVerifyCode(initialValue ?? '');
    }, [initialValue]);

    useEffect(() => {
        codeValidator(verifyCode);
    }, [verifyCode, codeValidator]);

    return (
        <WorkflowCard>
            <WorkflowCardHeader title={props.title}></WorkflowCardHeader>
            <WorkflowCardInstructions instructions={props.instructions}></WorkflowCardInstructions>
            <WorkflowCardBody>
                <TextField
                    label={verifyCodeInputLabel}
                    fullWidth
                    value={verifyCode}
                    onChange={(evt): void => {
                        setVerifyCode(evt.target.value);
                    }}
                    // onKeyPress={(e): void => {
                    //     if (e.key === 'Enter' && onSubmit) onSubmit();
                    // }}
                    variant="filled"
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
            <WorkflowCardActions />

        </WorkflowCard>

    );
};