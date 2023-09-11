import React, { useCallback, useEffect } from 'react';
import { VerifyCodeScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardActions } from '../../components/WorkflowCard/WorkflowCardActions';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { WorkflowCardHeader } from '../../components/WorkflowCard/WorkflowCardHeader';
import { WorkflowCardInstructions } from '../../components/WorkflowCard/WorkflowCardInstructions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ErrorManager from '../../components/Error/ErrorManager';

/**
 * Component that renders a screen that prompts a user to enter the confirmation code
 * that was sent to the email address that they used to register.
 *
 * @param codeValidator function that validates the code text field
 * @param onResend function that is called when the resend link/button is clicked
 * @param resendInstructions text to display ahead of the resend link/button
 * @param resendLabel text to display for the resend link/button
 * @param initialValue the initial value for the code text field
 * @param verifyCodeInputLabel the label for the code text field
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 *
 * @category Component
 */

export const VerifyCodeScreenBase: React.FC<React.PropsWithChildren<VerifyCodeScreenProps>> = (props) => {
    const {
        codeValidator,
        onResend,
        resendInstructions,
        resendLabel,
        verifyCodeInputLabel,
        initialValue,
        errorDisplayConfig,
    } = props;

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

    useEffect(() => {
        if (verifyCode.length > 0) {
            setShouldValidateCode(true);
            handleVerifyCodeInputChange(verifyCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnNext = (): void => {
        const { onNext } = actionsProps;
        if (onNext) onNext({ code: verifyCode });
    };

    const handleOnPrevious = (): void => {
        const { onPrevious } = actionsProps;
        if (onPrevious) onPrevious({ code: verifyCode });
    };

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardInstructions {...instructionsProps} />
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <TextField
                        label={verifyCodeInputLabel}
                        fullWidth
                        value={verifyCode}
                        onChange={(evt): void => {
                            handleVerifyCodeInputChange(evt.target.value);
                        }}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && ((verifyCode.length > 0 && isCodeValid) || actionsProps.canGoNext))
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
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                canGoNext={verifyCode.length > 0 && isCodeValid && actionsProps.canGoNext}
                onNext={handleOnNext}
                onPrevious={handleOnPrevious}
            />
        </WorkflowCard>
    );
};
