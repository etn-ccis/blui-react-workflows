import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { ChangePasswordDialogBase } from './ChangePasswordDialogBase';

afterEach(cleanup);

describe('AccountDetailsScreenBase tests', () => {
    it('renders without crashing', () => {
        render(
            <ChangePasswordDialogBase
                open={true}
                onSubmit={undefined}
                PasswordProps={{
                    onPasswordChange: function (passwords: { password: string; confirm: string }): void {
                        throw new Error(JSON.stringify(passwords));
                    },
                    newPasswordLabel: '',
                    initialNewPasswordValue: '',
                    confirmPasswordLabel: '',
                    initialConfirmPasswordValue: '',
                    passwordRequirements: [],
                    passwordRef: undefined,
                    confirmRef: undefined,
                    onSubmit: function (): void {
                        throw new Error('Function not implemented.');
                    },
                }}
                currentPasswordChange={function (currentPassword: string): void {
                    throw new Error(currentPassword);
                }}
                enableButton={false}
            />
        );
    });
});
