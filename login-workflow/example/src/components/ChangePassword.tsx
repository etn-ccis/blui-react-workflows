import React from 'react';
import { ChangePasswordDialog } from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';

export const ChangePassword = (): JSX.Element => {
    const app = useApp();

    return (
        <ChangePasswordDialog
            open={app.showChangePasswordDialog}
            onPrevious={(): void => app.setShowChangePasswordDialog(false)}
            onSubmit={(): void => app.setShowChangePasswordDialog(false)}
        />
    );
};
