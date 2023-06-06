import React from 'react';
import { ChangePasswordDialogBase } from '@brightlayer-ui/react-auth-workflow';

export const ChangePasswordDialogTest = () => {
    return (
        <ChangePasswordDialogBase
            open={true}
            onSubmit={(): void => {}}
            PasswordProps={{
                onPasswordChange: function (passwords: { password: string; confirm: string }): void {
                    throw new Error('Function not implemented.');
                },
                newPasswordLabel: undefined,
                initialNewPasswordValue: undefined,
                confirmPasswordLabel: undefined,
                initialConfirmPasswordValue: undefined,
                passwordRequirements: undefined,
                passwordRef: undefined,
                confirmRef: undefined,
                onSubmit: undefined,
            }}
        />
    );
};
