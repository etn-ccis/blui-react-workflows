import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { ForgotPasswordScreenBase, AuthContextProvider, useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { useApp } from '../../contexts/AppContextProvider';
import { routes } from '../../navigation/Routing';

const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const emailValidator = (email: string): boolean | string =>
    new RegExp(EMAIL_REGEX).test(email) ? true : 'Please enter a valid email';

export const ForgotPasswordScreenBaseTest = (): JSX.Element => {
    const { language } = useApp();
    const navigate = useNavigate();
    const securityContextActions = useSecurityActions();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: '1 1 0px' }}>
                <AuthContextProvider
                    language={language}
                    routeConfig={routes}
                    navigate={navigate}
                    actions={ProjectAuthUIActions(securityContextActions)}
                >
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
                            onNext: (): void => {},
                            onPrevious: (): void => navigate('/'),
                        }}
                        // eslint-disable-next-line
                        slots={{ SuccessScreen: (): JSX.Element => <Box>Success</Box> }}
                    />
                </AuthContextProvider>
            </Box>
        </Box>
    );
};
