import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult, act } from '@testing-library/react';
import { VerifyCodeScreen } from './VerifyCodeScreen';
import { VerifyCodeScreenProps } from './types';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('Verify Code Screen', () => {
    let mockOnResend: any;
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnResend = jest.fn();
        mockOnNext = jest.fn();
    });

    const renderer = (props?: VerifyCodeScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <VerifyCodeScreen {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Verify Email')).toBeInTheDocument();
        expect(
            screen.getByText(
                'A verification code has been sent to the email address you provided. Click the link or enter the code below to continue. This code is valid for 30 minutes.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Send Again')).toBeInTheDocument();
        expect(screen.getByText("Didn't receive an email?")).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeDisabled();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
    });

    it('sets error state when code is too short', () => {
        const { getByLabelText, rerender } = renderer();

        // Rerender to ensure state changes have taken effect
        rerender(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <VerifyCodeScreen
                        onResend={mockOnResend}
                        verifyCodeInputLabel="Verify Code"
                        codeValidator={(code: string): boolean | string => {
                            if (code?.length > 2) {
                                return true;
                            }
                            return 'Code must be at least 3 characters';
                        }}
                    />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

        const verifyCodeInput = getByLabelText('Verify Code');
        fireEvent.change(verifyCodeInput, { target: { value: '12' } });
        fireEvent.blur(verifyCodeInput);
        expect(screen.getByText(/Next/i)).toBeDisabled();
        expect(verifyCodeInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set error state when code is long enough', () => {
        const { getByLabelText, rerender } = renderer();

        // Rerender to ensure state changes have taken effect
        rerender(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <VerifyCodeScreen
                        onResend={mockOnResend}
                        verifyCodeInputLabel="Verify Code"
                        codeValidator={(code: string): boolean | string => {
                            if (code?.length > 2) {
                                return true;
                            }
                            return 'Code must be at least 3 characters';
                        }}
                    />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

        const verifyCodeInput = getByLabelText('Verify Code');
        fireEvent.change(verifyCodeInput, { target: { value: '1234' } });
        fireEvent.blur(verifyCodeInput);
        expect(screen.getByText(/Next/i)).toBeEnabled();
        expect(verifyCodeInput).toHaveAttribute('aria-invalid', 'false');
    });

    it('calls onResend when the resend link is clicked', () => {
        const { getByText } = render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <VerifyCodeScreen onResend={mockOnResend} resendLabel="Resend" />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

        const resendLink = getByText('Resend');
        fireEvent.click(resendLink);
        expect(mockOnResend).toHaveBeenCalled();
    });

    it('calls onNext when the next button is clicked', async () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                canGoNext: true,
                showNext: true,
                nextLabel: 'Next',
                onNext: mockOnNext(),
            },
        });

        const verifyCodeInput = getByLabelText('Verification Code');
        const nextButton = screen.getByText('Next');
        expect(verifyCodeInput).toHaveValue('');
        expect(screen.getByText(/Next/i)).toBeDisabled();
        fireEvent.change(verifyCodeInput, { target: { value: '123' } });
        //eslint-disable-next-line
        await act(async () => {
            fireEvent.click(nextButton);
        });
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('pre-populates the input field with initialValue', () => {
        const { getByLabelText } = render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <VerifyCodeScreen onResend={mockOnResend} initialValue="123" verifyCodeInputLabel="Verify Code" />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

        const verifyCodeInput = getByLabelText('Verify Code');
        expect(verifyCodeInput).toHaveValue('123');
    });

    it('displays title, instructions, resendInstructions, and resendLabel correctly', () => {
        const { getByText } = render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <VerifyCodeScreen
                        onResend={mockOnResend}
                        WorkflowCardHeaderProps={{ title: 'Title' }}
                        WorkflowCardInstructionProps={{ instructions: 'Instructions' }}
                        resendInstructions="Resend Instructions"
                        resendLabel="Resend"
                    />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

        expect(getByText('Title')).toBeInTheDocument();
        expect(getByText('Instructions')).toBeInTheDocument();
        expect(getByText('Resend Instructions')).toBeInTheDocument();
        expect(getByText('Resend')).toBeInTheDocument();
    });
});
