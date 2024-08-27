import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useTranslation } from 'react-i18next';
import { OktaRedirectLoginScreenBase } from './OktaRedirectLoginScreenBase';
import { OktaRedirectLoginScreenProps } from './types';
import { useAuthContext } from '../../contexts';

/**
 * Component that renders an okta login screen.
 *
 * @param {OktaRedirectLoginScreenProps} props - props of OktaRedirectLoginScreen
 *
 * @category Component
 */

export const OktaRedirectLoginScreen: React.FC<OktaRedirectLoginScreenProps> = (props) => {
    const { authState, oktaAuth } = useOktaAuth();
    const [isLoading, setIsLoading] = useState(!authState);
    const { t } = useTranslation();
    const auth = useAuthContext();
    const { navigate, routeConfig } = auth;

    const {
        loginButtonLabel = t('bluiCommon:ACTIONS.OKTA_LOG_IN'),
        showForgotPassword = true,
        forgotPasswordLabel = t('bluiCommon:LABELS.FORGOT_PASSWORD'),
        onForgotPassword = (): void => navigate(routeConfig.FORGOT_PASSWORD as string),
        showSelfRegistration = true,
        selfRegisterInstructions = t('bluiCommon:LABELS.NEED_ACCOUNT'),
        selfRegisterButtonLabel = t('bluiCommon:ACTIONS.CREATE_ACCOUNT'),
        onSelfRegister = (): void => navigate(routeConfig.REGISTER_SELF as string),
        showContactSupport = true,
        contactSupportLabel = t('bluiCommon:MESSAGES.CONTACT'),
        onContactSupport = (): void => navigate(routeConfig.SUPPORT as string),
        showCyberSecurityBadge = true,
        projectImage,
        header,
        footer,
        ...otherProps
    } = props;

    useEffect(() => {
        setIsLoading(!authState);
    }, [authState]);

    const handleOnLogin = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await oktaAuth.signInWithRedirect();
            await props.onLogin?.();
        } catch (_error) {
            // eslint-disable-next-line no-console
            console.log(_error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OktaRedirectLoginScreenBase
            loading={isLoading}
            loginButtonLabel={loginButtonLabel}
            onLogin={handleOnLogin}
            showForgotPassword={showForgotPassword}
            forgotPasswordLabel={forgotPasswordLabel}
            onForgotPassword={onForgotPassword}
            showSelfRegistration={showSelfRegistration}
            selfRegisterButtonLabel={selfRegisterButtonLabel}
            selfRegisterInstructions={selfRegisterInstructions}
            onSelfRegister={onSelfRegister}
            showContactSupport={showContactSupport}
            contactSupportLabel={contactSupportLabel}
            onContactSupport={onContactSupport}
            showCyberSecurityBadge={showCyberSecurityBadge}
            projectImage={projectImage}
            header={header}
            footer={footer}
            {...otherProps}
        />
    );
};
