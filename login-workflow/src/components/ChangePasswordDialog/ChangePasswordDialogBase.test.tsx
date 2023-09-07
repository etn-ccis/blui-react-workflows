import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { ChangePasswordDialogBase } from './ChangePasswordDialogBase';

afterEach(cleanup);

describe('ChangePasswordDialogBase tests', () => {
    it('renders without crashing', () => {
        render(
            <ChangePasswordDialogBase
                open={true}
                onSubmit={(): any => {}}
                PasswordProps={{
                    onPasswordChange: (): void => {},
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
                currentPasswordChange={(): void => {}}
                enableButton={false}
            />
        );
    });

    it('input onChange callBack', () => {
        const { getByLabelText } = render(
            <ChangePasswordDialogBase
                open={true}
                onSubmit={(): any => {}}
                currentPasswordChange={(): void => {}}
                enableButton={false}
                PasswordProps={{
                    onPasswordChange: (): void => {},
                    newPasswordLabel: '',
                    initialNewPasswordValue: '',
                    confirmPasswordLabel: '',
                    initialConfirmPasswordValue: '',
                    passwordRequirements: [],
                    passwordRef: undefined,
                    confirmRef: undefined,
                    onSubmit: (): void => {},
                }}
                currentPasswordLabel="Current Password"
            />
        );

        const currentPasswordInput = getByLabelText('Current Password');
        expect(currentPasswordInput).toHaveValue('');
        fireEvent.change(currentPasswordInput, { target: { value: 'Password@123' } });
        expect(currentPasswordInput).toHaveValue('Password@123');
    });
});
