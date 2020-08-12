import React from 'react';
import { useAccountUIState } from '@pxblue/react-auth-shared';
import { ForgotPassword } from '../ForgotPassword';
import { ResetPasswordSent } from '../../subScreens/ResetPasswordSent';

export const ResetPasswordNav: React.FC = (props) => {
    const accountUIState = useAccountUIState();

    return accountUIState.forgotPassword.transitSuccess !== true ? <ForgotPassword /> : <ResetPasswordSent />;
};
