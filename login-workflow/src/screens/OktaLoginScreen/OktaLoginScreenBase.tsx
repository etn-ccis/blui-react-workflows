import React from 'react';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cyberSecurityBadge from '../../assets/images/cybersecurity_certified.png';
import ErrorManager from '../../components/Error/ErrorManager';
import { LinkStyles } from '../../styles';
import { OktaLoginScreenProps } from './types';

/**
 * Component that renders an okta login screen that prompts a user to enter a username to login.
 *
 * @param {OktaLoginScreenProps} props - props of OktaLoginScreen base component
 *
 * @category Component
 */

export const OktaLoginScreenBase: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = (props) => {
    const {
        widgetConfigProps, header, projectImage, footer, errorDisplayConfig,showForgotPassword,forgotPasswordLabel,onForgotPassword, showContactSupport, contactSupportLabel,onContactSupport, showCyberSecurityBadge, ...otherProps
    } = props;

    const handleForgotPassword = (): void => {
        if (onForgotPassword) onForgotPassword();
    };

    const handleContactSupport = (): void => {
        if (onContactSupport) onContactSupport();
    };

    return (
        <WorkflowCard  {...otherProps}>
            <WorkflowCardBody sx={{ py: { xs: 4, sm: 4, md: 4 }, px: { xs: 4, sm: 8, md: 8 } }}>
                <ErrorManager {...errorDisplayConfig}>
                    {/* Write widget */}
                    <Box>Widget</Box>
                </ErrorManager>
                {showForgotPassword && (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                    >
                        <Typography
                            variant="body2"
                            sx={LinkStyles}
                            onClick={handleForgotPassword}
                        >
                            {forgotPasswordLabel || 'Forgot your password?'}
                        </Typography>
                    </Box>
                )}
                {showContactSupport && (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, textAlign: 'center' }}
                    >
                        <Typography
                            variant="body2"
                            sx={LinkStyles}
                            onClick={handleContactSupport}
                        >
                            {contactSupportLabel || 'Contact Support'}
                        </Typography>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>{footer}</Box>

                {showCyberSecurityBadge && (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
                    >
                        <img
                            src={cyberSecurityBadge}
                            alt="Cyber Security Badge"
                            style={{ width: '100px' }}
                        />
                    </Box>
                )}
            </WorkflowCardBody>
        </WorkflowCard>
    );
};
