import React, { useEffect, useRef } from 'react';
import { WorkflowCard } from '../../components/WorkflowCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cyberSecurityBadge from '../../assets/images/cybersecurity_certified.png';
import ErrorManager from '../../components/Error/ErrorManager';
import { LinkStyles } from '../../styles';
import { OktaLoginScreenProps } from './types';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignIn from '@okta/okta-signin-widget';
import './OktaLoginScreenBase.css';

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
    const widgetRef = useRef(null);
    const { oktaAuth, authState } = useOktaAuth();

    useEffect((): void | (() => void) => {
        if (!widgetRef.current) {
            return;
        }

        widgetConfigProps.customButtons = customButtons;
        const widget = new OktaSignIn(widgetConfigProps);

        widget.showSignInAndRedirect({ el: widgetRef.current }).catch(() => {});

        return () => widget.remove();

    }, [oktaAuth, authState]);


    const linkButtons: any = [];

    const customButtons: any = linkButtons.concat(props.widgetConfigProps.customButtons);


    return (
        <WorkflowCard {...otherProps}>
                <ErrorManager {...errorDisplayConfig}>
                    <Box className='OktaWidget' ref={widgetRef}></Box>
                </ErrorManager>
        </WorkflowCard>
    );
};
