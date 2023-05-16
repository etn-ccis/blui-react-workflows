import React, { useCallback, useEffect } from 'react';
import { useLanguageLocale } from '../../../auth-shared';
import { useTheme } from '@mui/material/styles';
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

export const VerifyCodeScreenBase: React.FC<React.PropsWithChildren<React.PropsWithChildren<VerifyCodeScreenProps>>> = (props) => {
    const { codeValidator = (code: string): boolean | string => {
        if (code?.length > 0) {
            return true;
        } return 'You must provide a valid code';
    },
        onResend,
        resendInstructions,
        resendLabel,
        verifyCodeInputLabel,
        initialValue,
        title,
        instructions,
        ...actionProps
    } = props;

    const theme = useTheme();
    const { t } = useLanguageLocale();

    const [verifyCode, setVerifyCode] = React.useState(initialValue ?? '');
    const [isCodeValid, setIsCodeValid] = React.useState(codeValidator(initialValue) ?? false)
    const [codeError, setCodeError] = React.useState('')


    const handleVerifyCodeInputChange = useCallback((code: string) => {
        setVerifyCode(code);
        // setIsCodeValid(codeValidator(code));

        // check code validator return statement
        const validatorResponse = codeValidator(code);

        // if true set is code valid to true and set code error to empty string
        if()

        // then check if false and type of code validator return statement equals string set is code valid to false and set code error set to error statement

        // else if false and type of code validator equals boolean set is code valid false and set code error empty string

        //eslint-disable-next-line noconsole
        console.log('isCodeValid',isCodeValid)
    }, [
        codeValidator,
        verifyCode
    ])

    return (
        <WorkflowCard>
            <WorkflowCardHeader title={title}></WorkflowCardHeader>
            <WorkflowCardBody>
            <WorkflowCardInstructions divider={true} instructions={instructions}></WorkflowCardInstructions>
                <TextField
                    label={verifyCodeInputLabel}
                    fullWidth
                    value={verifyCode}
                    onChange={(evt): void => {
                        handleVerifyCodeInputChange(evt.target.value);
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
            <WorkflowCardActions
            {...actionProps}
            ></WorkflowCardActions>

        </WorkflowCard>

    );
};