import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { ForgotPasswordScreenBase, SuccessScreenBase } from '@brightlayer-ui/react-auth-workflow';
import { CheckCircle } from '@mui/icons-material';

const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const emailValidator = (email: string): boolean | string =>
    new RegExp(EMAIL_REGEX).test(email) ? true : 'Please enter a valid email';

export const ForgotPasswordScreenBaseTest = (): JSX.Element => {
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState('');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: '1 1 0px' }}>
                <ForgotPasswordScreenBase
                    WorkflowCardHeaderProps={{ title: 'Forgot Password' }}
                    WorkflowCardInstructionProps={{
                        instructions: (
                            <Box>
                                Please enter the account email associated with the account.
                                <Box sx={{ my: 3 }}>
                                    If this email has an account with Eaton, you will receive a response within{' '}
                                    <Box fontWeight="fontWeightBold" display="inline">
                                        one business day
                                    </Box>
                                    .
                                </Box>
                                For urgent account issues, please call{' '}
                                <Box fontWeight="fontWeightMedium" display="inline" color={'primary.main'}>
                                    1-800-123-4567
                                </Box>
                                .
                            </Box>
                        ),
                    }}
                    emailValidator={emailValidator}
                    initialEmailValue={''}
                    emailLabel={'Email Address'}
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: 'Next',
                        canGoNext: true,
                        showPrevious: true,
                        previousLabel: 'Back',
                        canGoPrevious: true,
                        onNext: (data: any): void => {
                            setEmailInput(data?.email);
                        },
                        onPrevious: (): void => navigate('/'),
                    }}
                    slots={{
                        /* eslint-disable @typescript-eslint/naming-convention */
                        SuccessScreen: (props) => (
                            <SuccessScreenBase
                                WorkflowCardHeaderProps={{ title: 'Forgot Password' }}
                                icon={<CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 5 }} />}
                                messageTitle="Email Sent"
                                message={
                                    <Box component="div">
                                        A link to reset your password has been sent to{' '}
                                        <Box fontWeight="fontWeightBold" display="inline">
                                            {emailInput}
                                        </Box>
                                        <Box>.</Box>
                                    </Box>
                                }
                                WorkflowCardActionsProps={{
                                    showNext: true,
                                    nextLabel: 'Done',
                                    canGoNext: true,
                                    onNext: (): void => {
                                        navigate('/');
                                    },
                                    fullWidthButton: true,
                                }}
                                {...props}
                            />
                        ),
                    }}
                />
            </Box>
        </Box>
    );
};
