import React, { useEffect, useState } from 'react';

type OktaLoginScreenProps = {
    /* Find more about oktaLoginConfigProps using below link
    https://github.com/etn-electrical/fiji-bssrm-ui/blob/5229c56610e81e3323c904bc85362a91405ec5c2/packages/web/src/oktaConfig.ts#L8 */
    oktaLoginConfigProps: object,
    /* All embedded widgets should set these basic options: issuer, clientId, and redirectUri. */
    widgetConfigProps: object,
}

export const OktaLoginScreen: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = (props) => {
    const {children = [NeedHelp, PrivacyPolicy, FooterComponent]} = props;

    useEffect(() => {
        // Okta login widget initialization
        const {oktaLoginConfigProps, widgetConfigProps} = props;
        const oktaSignIn = new OktaSignIn({...oktaLoginConfigProps, ...widgetConfigProps});

        /*  This method is used to display the sign-in form and redirect the user to the Okta authentication page for authentication. */
        widget.showSignInAndRedirect({ el: widgetRef.current }).catch(() => {
            //handle error here
        });

        return () => widget.remove()
    }, []);

    return (
        <>
        <div ref={widgetRef} className={isSuperRealm ? 'super-realm-widget' : 'login-widget'} />
        {/* map children to div */}
            {children}
        </>
    )
} 