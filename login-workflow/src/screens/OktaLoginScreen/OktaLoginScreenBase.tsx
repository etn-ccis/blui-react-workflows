import React from 'react';
import { OktaLoginScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { Box, Button, Typography } from '@mui/material';
import ErrorManager from '../../components/Error/ErrorManager';
import { LinkStyles } from '../../styles';
import cyberSecurityBadge from '../../assets/images/cybersecurity_certified.png';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { getOktaLoginScreenUtilityClass, OktaLoginScreenClassKey } from './utilityClasses';

const useUtilityClasses = (ownerState: OktaLoginScreenProps): Record<OktaLoginScreenClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        projectImageWrapper: ['projectImageWrapper'],
        loginButton: ['loginButton'],
        contactSupportWrapper: ['contactSupportWrapper'],
        contactSupportLabel: ['contactSupportLabel'],
        cyberSecurityBadgeWrapper: ['cyberSecurityBadgeWrapper'],
        cyberSecurityBadge: ['cyberSecurityBadge'],
    };

    return composeClasses(slots, getOktaLoginScreenUtilityClass, classes);
};

/**
 * Component that renders an okta login screen.
 *
 * @param {OktaLoginScreenProps} props - props of OktaLoginScreen base component
 *
 * @category Component
 */

export const OktaLoginScreenBase: React.FC<OktaLoginScreenProps> = (props) => {
    const defaultClasses = useUtilityClasses(props);

    const {
        header,
        projectImage,
        errorDisplayConfig,
        loginButtonLabel,
        onLogin,
        showContactSupport,
        showCyberSecurityBadge,
        contactSupportLabel,
        footer,
        onContactSupport,
        ...otherProps
    } = props;

    const handleOnLogin = async (): Promise<void> => {
        if (onLogin) await onLogin();
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

                <ErrorManager {...errorDisplayConfig}>
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
                </ErrorManager>

                {showContactSupport && (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, textAlign: 'center' }}
                        className={defaultClasses.contactSupportWrapper}
                        data-testid={defaultClasses.contactSupportWrapper}
                    >
                        <Typography variant="body2" sx={LinkStyles} onClick={handleContactSupport}>
                            {contactSupportLabel || 'Contact Support'}
                        </Typography>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>{footer}</Box>

                {showCyberSecurityBadge && (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
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
