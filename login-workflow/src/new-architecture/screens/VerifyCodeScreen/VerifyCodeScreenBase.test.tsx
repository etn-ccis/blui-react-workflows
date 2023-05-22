import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { VerifyCodeScreenBase } from './VerifyCodeScreenBase';

afterEach(cleanup);

describe('Verify Code Screen Base', () => {
    let mockOnResend: any;
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnResend = jest.fn();
        mockOnNext = jest.fn();
    });

    it('renders without crashing', () => {
        render(
            <VerifyCodeScreenBase
                WorkflowCardHeaderProps={{ title: 'Verify Email' }}
                WorkflowCardInstructionProps={{
                    instructions: 'Verification code instructions',
                }}
                initialValue={'123'}
                verifyCodeInputLabel={'Verification code input label'}
                resendLabel="Send Again"
                resendInstructions={"Didn't receive email?"}
                WorkflowCardActionsProps={{
                    showNext: true,
                    nextLabel: 'Next',
                    canGoNext: true,
                    showPrevious: true,
                    previousLabel: 'Back',
                    canGoPrevious: true,
                    currentStep: 2,
                    totalSteps: 6,
                }}
            ></VerifyCodeScreenBase>
        );
        expect(screen.getByText('Verify Email')).toBeInTheDocument();
        expect(screen.getByText('Verification code instructions')).toBeInTheDocument();
        expect(screen.getByText('Send Again')).toBeInTheDocument();
        expect(screen.getByText("Didn't receive email?")).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
    });

    it('sets error state when code is too short', () => {
        const { getByLabelText, rerender } = render(
            <VerifyCodeScreenBase
                onResend={mockOnResend}
                verifyCodeInputLabel="Verify Code"
                codeValidator={(code: string): boolean | string => {
                    if (code?.length > 2) {
                        return true;
                    }
                    return 'Code must be at least 3 characters';
                }}
            />
        );

        const verifyCodeInput = getByLabelText('Verify Code');
        fireEvent.change(verifyCodeInput, { target: { value: '12' } });
        fireEvent.blur(verifyCodeInput);

        // Rerender to ensure state changes have taken effect
        rerender(
            <VerifyCodeScreenBase
                onResend={mockOnResend}
                verifyCodeInputLabel="Verify Code"
                codeValidator={(code: string): boolean | string => {
                    if (code?.length > 2) {
                        return true;
                    }
                    return 'Code must be at least 3 characters';
                }}
            />
        );
        expect(verifyCodeInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set error state when code is long enough', () => {
        const { getByLabelText, rerender } = render(
            <VerifyCodeScreenBase
                onResend={mockOnResend}
                verifyCodeInputLabel="Verify Code"
                codeValidator={(code: string): boolean | string => {
                    if (code?.length > 2) {
                        return true;
                    }
                    return 'Code must be at least 3 characters';
                }}
            />
        );

        const verifyCodeInput = getByLabelText('Verify Code');
        fireEvent.change(verifyCodeInput, { target: { value: '123' } });
        fireEvent.blur(verifyCodeInput);

        // Rerender to ensure state changes have taken effect
        rerender(
            <VerifyCodeScreenBase
                onResend={mockOnResend}
                verifyCodeInputLabel="Verify Code"
                codeValidator={(code: string): boolean | string => {
                    if (code?.length > 2) {
                        return true;
                    }
                    return 'Code must be at least 3 characters';
                }}
            />
        );
        expect(verifyCodeInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('calls onResend when the resend link is clicked', () => {
        const { getByText } = render(<VerifyCodeScreenBase onResend={mockOnResend} resendLabel="Resend" />);

        const resendLink = getByText('Resend');
        fireEvent.click(resendLink);

        expect(mockOnResend).toHaveBeenCalled();
    });

    it('calls onNext when the next button is clicked', () => {
        const { getByText } = render(
            <VerifyCodeScreenBase
                WorkflowCardActionsProps={{
                    onNext: mockOnNext,
                    showNext: true,
                    nextLabel: 'Next',
                    canGoNext: true,
                    currentStep: 2,
                    totalSteps: 6,
                }}
            />
        );

        const nextButton = getByText('Next');
        fireEvent.click(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });

    it('pre-populates the input field with initialValue', () => {
        const { getByLabelText } = render(
            <VerifyCodeScreenBase
                onResend={mockOnResend}
                initialValue="123"
                verifyCodeInputLabel="Verify Code"
                codeValidator={(code: string): boolean | string => {
                    if (code?.length > 2) {
                        return true;
                    }
                    return 'Code must be at least 3 characters';
                }}
            />
        );

        const verifyCodeInput = getByLabelText('Verify Code');
        expect(verifyCodeInput).toHaveValue('123');
    });

    it('displays title, instructions, resendInstructions, and resendLabel correctly', () => {
        const { getByText } = render(
            <VerifyCodeScreenBase
                onResend={mockOnResend}
                WorkflowCardHeaderProps={{ title: 'Title' }}
                WorkflowCardInstructionProps={{ instructions: 'Instructions' }}
                resendInstructions="Resend Instructions"
                resendLabel="Resend"
            />
        );

        expect(getByText('Title')).toBeInTheDocument();
        expect(getByText('Instructions')).toBeInTheDocument();
        expect(getByText('Resend Instructions')).toBeInTheDocument();
        expect(getByText('Resend')).toBeInTheDocument();
    });
});
