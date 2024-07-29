import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useTranslation } from 'react-i18next';
import { OktaLoginScreenBase } from './OktaLoginScreenBase';
import { OktaLoginScreenProps } from './types';
import { useAuthContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';

/**
 * Component that renders an okta login screen.
 *
 * @param {OktaLoginScreenProps} props - props of OktaLoginScreen
 *
 * @category Component
 */

export const OktaLoginScreen: React.FC<OktaLoginScreenProps> = (props) => {
    const { authState, oktaAuth } = useOktaAuth();
    const [isLoading, setIsLoading] = useState(!authState);
    const { triggerError, errorManagerConfig } = useErrorManager();
    const { t } = useTranslation();
    const auth = useAuthContext();
    const { navigate, routeConfig } = auth;
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };
    const {
        loginButtonLabel = t('bluiCommon:ACTIONS.OKTA_LOG_IN'),
        showContactSupport = true,
        contactSupportLabel = t('bluiCommon:MESSAGES.CONTACT'),
        onContactSupport = (): void => navigate(routeConfig.SUPPORT as string),
        showCyberSecurityBadge = true,
        projectImage,
        header,
        footer,
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
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OktaLoginScreenBase
            loading={isLoading}
            loginButtonLabel={loginButtonLabel}
            onLogin={handleOnLogin}
            showContactSupport={showContactSupport}
            contactSupportLabel={contactSupportLabel}
            onContactSupport={onContactSupport}
            errorDisplayConfig={errorDisplayConfig}
            showCyberSecurityBadge={showCyberSecurityBadge}
            projectImage={projectImage}
            header={header}
            footer={footer}
        />
    );
};
