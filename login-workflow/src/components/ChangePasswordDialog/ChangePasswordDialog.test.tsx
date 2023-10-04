import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';
import { ChangePasswordDialog } from './ChangePasswordDialog';
import { AuthContextProvider } from '../../contexts';
import { BrowserRouter } from 'react-router-dom';
import { ChangePasswordDialogProps } from './types';
import { authContextProviderProps } from '../../testUtils';

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
            <AuthContextProvider {...authContextProviderProps}>
                <BrowserRouter>
                    <ChangePasswordDialog open {...props} />
                </BrowserRouter>
            </AuthContextProvider>
        );

    it('renders without crashing', () => {
        const { getByLabelText } = renderer({
            open: true,
            currentPasswordLabel: 'Current Password',
        });
        const currentPasswordInput = getByLabelText('Current Password');
        expect(currentPasswordInput).toHaveValue('');
        expect(screen.findAllByRole('input')).not.toBeNull();
    });

    it('should display input field with passed prop', () => {
        const { getByLabelText } = renderer({
            open: true,
            currentPasswordLabel: 'Current Password',
        });

        const currentPasswordInput = getByLabelText('Current Password');
        expect(currentPasswordInput).toHaveValue('');
        fireEvent.change(currentPasswordInput, { target: { value: 'Abc@2023' } });
        expect(currentPasswordInput).toHaveValue('Abc@2023');
    });

    it('should display input fields with passed props', () => {
        const { getByLabelText } = renderer({
            open: true,
            PasswordProps: {
                newPasswordLabel: 'New Password',
                confirmPasswordLabel: 'Confirm New Password',
                onPasswordChange: updateFields,
                passwordRequirements: [],
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

    it('should show success screen, when okay button is clicked', async () => {
        const { getByLabelText } = renderer({
            open: true,
            showSuccessScreen: true,
            PasswordProps: {
                newPasswordLabel: 'New Password',
                confirmPasswordLabel: 'Confirm New Password',
                onPasswordChange: updateFields,
                passwordRequirements: [],
            },
        });

        const currentPasswordInput = getByLabelText('Current Password');
        fireEvent.change(currentPasswordInput, { target: { value: 'Abc@1234' } });
        const newPasswordInput = getByLabelText('New Password');
        const confirmPasswordInput = getByLabelText('Confirm New Password');
        fireEvent.change(newPasswordInput, { target: { value: 'Abc@1234' } });
        expect(newPasswordInput).toHaveValue('Abc@1234');
        fireEvent.change(confirmPasswordInput, { target: { value: 'Abc@1234' } });
        expect(confirmPasswordInput).toHaveValue('Abc@1234');

        fireEvent.click(screen.getByText('Okay'));
        expect(screen.getByText('Okay')).toBeEnabled();
        fireEvent.click(screen.getByText('Okay'));

        await waitFor(() => expect(screen.getByText('Your password was successfully reset.')));
    });
});
