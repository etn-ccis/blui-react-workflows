import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { ChangePasswordDialogBase } from './ChangePasswordDialogBase';

afterEach(cleanup);

describe('AccountDetailsScreenBase tests', () => {
    it('renders without crashing', () => {
        render(
            <ChangePasswordDialogBase
                onSubmit={undefined}
                passwordProps={{
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
                onSubmit={(): void => {}}
                currentPasswordChange={(): void => {}}
                enableButton={false}
                passwordProps={{
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
