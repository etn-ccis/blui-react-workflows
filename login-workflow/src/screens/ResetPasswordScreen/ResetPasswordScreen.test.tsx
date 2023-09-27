import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult, waitFor } from '@testing-library/react';
import { ResetPasswordScreen } from './ResetPasswordScreen';
import { AuthContextProvider } from '../../contexts';
import { ResetPasswordScreenProps } from './types';
import { authContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('Reset Password Screen', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: ResetPasswordScreenProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <BrowserRouter>
                    <ResetPasswordScreen {...props} />
                </BrowserRouter>
            </AuthContextProvider>
        );

    it('renders without crashing', () => {
        renderer();
        expect(screen.getByText('Reset Password')).toBeInTheDocument();
    });

    it('should update values when passed as props', () => {
        renderer({ WorkflowCardHeaderProps: { title: 'Test Title' } });
        expect(screen.queryByText('Reset Password')).toBeNull();
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should show success screen, when okay button is clicked', async () => {
        const { getByLabelText } = renderer({
            showSuccessScreen: true,
            PasswordProps: {
                newPasswordLabel: 'New Password',
                confirmPasswordLabel: 'Confirm New Password',
                onPasswordChange: jest.fn(),
                passwordRequirements: [],
            },
            WorkflowCardActionsProps: {
                canGoNext: true,
                nextLabel: 'Next',
            },
        });

        const newPasswordInput = getByLabelText('New Password');
        const confirmPasswordInput = getByLabelText('Confirm New Password');
        fireEvent.change(newPasswordInput, { target: { value: 'Abc@1234' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Abc@1234' } });
        fireEvent.click(screen.getByText('Next'));
        await waitFor(() => expect(screen.getByText('Your password was successfully reset.')));
    });

    it('should show loader, when loading prop is passed to WorkflowCardBaseProps', () => {
        renderer({ WorkflowCardBaseProps: { loading: true } });
        expect(screen.getByTestId('blui-spinner')).toBeInTheDocument();
    });

    it('should call onNext, when Next button clicked', async () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });

        const passwordField = getByLabelText('New Password');
        const confirmPasswordField = getByLabelText('Confirm New Password');
        fireEvent.change(passwordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(passwordField);
        fireEvent.change(confirmPasswordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(confirmPasswordField);
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);
        await waitFor(() => expect(mockOnNext).toHaveBeenCalled());
    });

    it('should call onPrevious, when Back button clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockOnPrevious(),
                showPrevious: true,
                previousLabel: 'Back',
            },
        });

        const backButton = screen.getByText('Back');
        expect(backButton).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
        fireEvent.click(backButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });
});
