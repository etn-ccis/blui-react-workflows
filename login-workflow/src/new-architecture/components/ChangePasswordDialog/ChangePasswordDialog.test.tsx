import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { ChangePasswordDialog } from './ChangePasswordDialog';
import { defaultProps as authContextProps } from '../../contexts/AuthContext/AuthContextProvider.test';
import { AuthContextProvider } from '../../contexts';
import { BrowserRouter } from 'react-router-dom';
import { ChangePasswordDialogProps } from './types';

afterEach(cleanup);

describe('Change Password Dialog tests', () => {
    let updateFields: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        updateFields = jest.fn();
    });

    const renderer = (props?: ChangePasswordDialogProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProps}>
                <BrowserRouter>
                    <ChangePasswordDialog {...props} />
                </BrowserRouter>
            </AuthContextProvider>
        );

    it('renders without crashing', () => {
        renderer();
    });

    it('Current password input test', () => {
        const { getByLabelText } = renderer({
            currentPasswordLabel: 'Current Password',
        });

        const currentPasswordInput = getByLabelText('Current Password');
        expect(currentPasswordInput).toHaveValue('');
        fireEvent.change(currentPasswordInput, { target: { value: 'Abc@2023' } });
        expect(currentPasswordInput).toHaveValue('Abc@2023');
    });

    it('New password input fields test', () => {
        const { getByLabelText } = renderer({
            passwordProps: {
                newPasswordLabel: 'New Password',
                confirmPasswordLabel: 'Confirm New Password',
                onPasswordChange: updateFields,
            },
        });

        const newPasswordInput = getByLabelText('New Password');
        expect(newPasswordInput).toHaveValue('');
        const confirmPasswordInput = getByLabelText('Confirm New Password');
        expect(confirmPasswordInput).toHaveValue('');
        fireEvent.change(newPasswordInput, { target: { value: 'Abc@1234' } });
        expect(newPasswordInput).toHaveValue('Abc@1234');
        fireEvent.change(confirmPasswordInput, { target: { value: 'Abc@1234' } });
        expect(confirmPasswordInput).toHaveValue('Abc@1234');
    });
});
