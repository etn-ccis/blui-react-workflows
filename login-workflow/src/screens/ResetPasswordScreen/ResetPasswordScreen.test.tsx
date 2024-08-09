import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult, waitFor, act } from '@testing-library/react';
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

    it('renders without crashing', async () => {
        renderer();
        await waitFor(() => expect(screen.getByText('Reset Password')).toBeInTheDocument);
    });

    it('should update values when passed as props', async () => {
        renderer({ WorkflowCardHeaderProps: { title: 'Test Title' } });
        expect(screen.queryByText('Reset Password')).toBeNull();
        await waitFor(() => expect(screen.getByText('Test Title')).toBeInTheDocument);
    });

    it('should show success screen, when okay button is clicked', async () => {
        const { getByLabelText, getByTestId } = renderer({
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
        const doneButton = getByTestId('BluiWorkflowCardActions-nextButton');
        fireEvent.click(doneButton);
    });

    it('should call handleNext callback function', () => {
        const { getByLabelText } = renderer({
            showSuccessScreen: false,
            PasswordProps: {
                newPasswordLabel: 'New Password',
                confirmPasswordLabel: 'Confirm New Password',
                onPasswordChange: jest.fn(),
                passwordRequirements: [],
            },
            WorkflowCardActionsProps: {
                canGoNext: true,
                nextLabel: 'Next',
                onNext: mockOnNext(),
            },
        });

        const newPasswordInput = getByLabelText('New Password');
        const confirmPasswordInput = getByLabelText('Confirm New Password');
        fireEvent.change(newPasswordInput, { target: { value: 'Abc@1234' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Abc@1234' } });
        fireEvent.click(screen.getByText('Next'));
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should show loader, when loading prop is passed to WorkflowCardBaseProps', async () => {
        renderer({ WorkflowCardBaseProps: { loading: true } });
        await waitFor(() => expect(screen.getByTestId('blui-spinner')).toBeInTheDocument);
    });

    it('should call onNext, when Next button clicked', async () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });
        await waitFor(() => expect(screen.getByText('Reset Password')).toBeInTheDocument);
        const passwordField = getByLabelText('New Password');
        const confirmPasswordField = getByLabelText('Confirm New Password');
        fireEvent.change(passwordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(passwordField);
        fireEvent.change(confirmPasswordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(confirmPasswordField);
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        await act(async () => {
            expect(await screen.findByText('Next')).toBeEnabled();
            fireEvent.click(nextButton);
        });
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should call onPrevious, when Back button clicked', async () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockOnPrevious(),
                showPrevious: true,
                previousLabel: 'Back',
            },
        });
        await waitFor(() => expect(screen.getByText('Reset Password')).toBeInTheDocument);

        const backButton = screen.getByText('Back');
        expect(backButton).toBeInTheDocument();
        await act(async () => {
            expect(await screen.findByText('Back')).toBeEnabled();
            fireEvent.click(backButton);
        });
        expect(mockOnPrevious).toHaveBeenCalled();
    });
});
