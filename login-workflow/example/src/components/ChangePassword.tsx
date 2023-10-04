import React from 'react';
import { ChangePasswordDialog } from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { LocalStorage } from '../store/local-storage';
import { useNavigate } from 'react-router-dom';

export const ChangePassword = (): JSX.Element => {
    const app = useApp();
    const navigate = useNavigate();
    const logOut = (): void => {
        app.setShowChangePasswordDialog(false);
        LocalStorage.clearAuthCredentials();
        app.onUserNotAuthenticated();
        navigate('/login');
    };

    return (
        <ChangePasswordDialog
            open={app.showChangePasswordDialog}
            onPrevious={(): void => app.setShowChangePasswordDialog(false)}
            onSubmit={(): void => app.setShowChangePasswordDialog(false)}
            onFinish={(): void => logOut()}
        />
    );
};
