import React from 'react';
import { OktaRedirectLoginScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { Box, Button, Typography, unstable_composeClasses as composeClasses } from '@mui/material';
import { LinkStyles } from '../../styles';
import cyberSecurityBadge from '../../assets/images/cybersecurity_certified.png';
import { getOktaRedirectLoginScreenUtilityClass, OktaRedirectLoginScreenClassKey } from './utilityClasses';

const useUtilityClasses = (
    ownerState: OktaRedirectLoginScreenProps
): Record<OktaRedirectLoginScreenClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        projectImageWrapper: ['projectImageWrapper'],
        loginButtonWrapper: ['loginButtonWrapper'],
        loginButton: ['loginButton'],
        forgotPasswordWrapper: ['forgotPasswordWrapper'],
        forgotPasswordLabel: ['forgotPasswordLabel'],
        selfRegisterWrapper: ['selfRegisterWrapper'],
        selfRegisterInstructionLabel: ['selfRegisterInstructionLabel'],
        selfRegisterLabel: ['selfRegisterLabel'],
        contactSupportWrapper: ['contactSupportWrapper'],
        contactSupportLabel: ['contactSupportLabel'],
        cyberSecurityBadgeWrapper: ['cyberSecurityBadgeWrapper'],
        cyberSecurityBadge: ['cyberSecurityBadge'],
    };

    return composeClasses(slots, getOktaRedirectLoginScreenUtilityClass, classes);
};

/**
 * Component that renders an okta login screen.
 *
 * @param {OktaRedirectLoginScreenProps} props - props of OktaRedirectLoginScreen base component
 *
 * @category Component
 */

export const OktaRedirectLoginScreenBase: React.FC<OktaRedirectLoginScreenProps> = (props) => {
    const defaultClasses = useUtilityClasses(props);

    const {
        header,
        projectImage,
        loginButtonLabel,
        onLogin,
        showForgotPassword,
        forgotPasswordLabel,
        onForgotPassword,
        showContactSupport,
        showCyberSecurityBadge,
        showSelfRegistration,
        selfRegisterButtonLabel,
        selfRegisterInstructions,
        onSelfRegister,
        contactSupportLabel,
        footer,
        onContactSupport,
        ...otherProps
    } = props;

    const handleOnLogin = async (): Promise<void> => {
        if (onLogin) await onLogin();
    };

    const handleForgotPassword = (): void => {
        if (onForgotPassword) onForgotPassword();
    };

    const handleSelfRegister = (): void => {
        if (onSelfRegister) onSelfRegister();
    };

    const handleContactSupport = (): void => {
        if (onContactSupport) onContactSupport();
    };

    return (
        <WorkflowCard className={defaultClasses.root} data-testid={defaultClasses.root} {...otherProps}>
            <WorkflowCardBody
                sx={{
                    py: { xs: 4, sm: 4, md: 4 },
                    px: { xs: 4, sm: 8, md: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
            >
                {header}
                <Box
                    sx={{ display: 'flex', maxWidth: '100%', mb: 6 }}
                    className={defaultClasses.projectImageWrapper}
                    data-testid={defaultClasses.projectImageWrapper}
                >
                    {projectImage}
                </Box>

                <Box
                    sx={{
                        my: 5,
                    }}
                    className={defaultClasses.loginButtonWrapper}
                    data-testid={defaultClasses.loginButtonWrapper}
                >
                    <Button
                        className={defaultClasses.loginButton}
                        data-testid={defaultClasses.loginButton}
                        onClick={(): void => {
                            void handleOnLogin();
                        }}
                        variant="contained"
                        color="primary"
                        sx={{
                            width: '100%',
                        }}
                    >
                        {loginButtonLabel || 'Sign In With Okta'}
                    </Button>
                </Box>

                {showForgotPassword && (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                        className={defaultClasses.forgotPasswordWrapper}
                        data-testid={defaultClasses.forgotPasswordWrapper}
                    >
                        <Typography
                            variant="body2"
                            sx={LinkStyles}
                            onClick={handleForgotPassword}
                            className={defaultClasses.forgotPasswordLabel}
                            data-testid={defaultClasses.forgotPasswordLabel}
                        >
                            {forgotPasswordLabel || 'Forgot your password?'}
                        </Typography>
                    </Box>
                )}

                {showSelfRegistration && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center',
                        }}
                        className={defaultClasses.selfRegisterWrapper}
                        data-testid={defaultClasses.selfRegisterWrapper}
                    >
                        <Typography
                            variant="body2"
                            className={defaultClasses.selfRegisterInstructionLabel}
                            data-testid={defaultClasses.selfRegisterInstructionLabel}
                        >
                            {selfRegisterInstructions || 'Need an account?'}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={LinkStyles}
                            onClick={handleSelfRegister}
                            className={defaultClasses.selfRegisterLabel}
                            data-testid={defaultClasses.selfRegisterLabel}
                        >
                            {selfRegisterButtonLabel || 'Register now!'}
                        </Typography>
                    </Box>
                )}

                {showContactSupport && (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                        className={defaultClasses.contactSupportWrapper}
                        data-testid={defaultClasses.contactSupportWrapper}
                    >
                        <Typography variant="body2" sx={LinkStyles} onClick={handleContactSupport}>
                            {contactSupportLabel || 'Contact Support'}
                        </Typography>
                    </Box>
                )}

                {footer && <Box sx={{ display: 'flex', justifyContent: 'center' }}>{footer}</Box>}

                {showCyberSecurityBadge && (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center' }}
                        className={defaultClasses.cyberSecurityBadgeWrapper}
                        data-testid={defaultClasses.cyberSecurityBadgeWrapper}
                    >
                        <img src={cyberSecurityBadge} alt="Cyber Security Badge" style={{ width: '100px' }} />
                    </Box>
                )}
            </WorkflowCardBody>
        </WorkflowCard>
    );
};
