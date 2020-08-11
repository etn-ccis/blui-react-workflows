import React, { useEffect } from 'react';
import { useLanguageLocale, useAccountUIState, useAccountUIActions, AccountActions } from '@pxblue/react-auth-shared';
import { useTheme } from '@material-ui/core';
import { useLocation, useParams, Route } from 'react-router-dom';
import { ForgotPassword } from '../ForgotPassword';
import { ResetPasswordSent } from '../../subScreens/ResetPasswordSent';

export const ResetPasswordNav: React.FC = (props) => {
    const { t } = useLanguageLocale();
    const theme = useTheme();
    const accountUIState = useAccountUIState();
    const accountUIActions = useAccountUIActions();
    const location = useLocation();

    // Reset state on dismissal
    useEffect(
        () => (): void => {
            accountUIActions.dispatch(AccountActions.resetPasswordReset());
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const resetPassword = (emailInput: string): void => {
        accountUIActions.actions.forgotPassword(emailInput);
    };

    const routeParams = useParams<{contactPhone: string}>();
    const contactPhone = routeParams?.contactPhone ?? '';

    // return (
    //     <Route path={'/reset-password'}>
    //         {accountUIState.forgotPassword.transitSuccess !== true ? <ResetPassword /> : <ResetPasswordSent /> }
    //     </Route>
    // )
    return accountUIState.forgotPassword.transitSuccess !== true ? <ForgotPassword /> : <ResetPasswordSent />
}