import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { ForgotPasswordScreenBase } from './ForgotPasswordScreenBase';
import { defaultProps as authContextProps } from '../../contexts/AuthContext/AuthContextProvider.test';
import { AuthContextProvider } from '../../contexts';
import Box from '@mui/material/Box';

afterEach(cleanup);

describe('Forgot Password Screen Base', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    it('renders without crashing', () => {
        render(
            <AuthContextProvider {...authContextProps}>
                <ForgotPasswordScreenBase
                    WorkflowCardHeaderProps={{ title: 'Forgot Password' }}
                    WorkflowCardInstructionProps={{
                        instructions: 'Forgot Password instructions',
                    }}
                    initialEmailValue={'test@email.net'}
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
                    slots={{ SuccessScreen: <Box>Success</Box> }}
                />
            </AuthContextProvider>
        );
        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
        expect(screen.getByText('Forgot Password instructions')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
    });

    it('sets error state when email is too short', () => {
        const { getByLabelText, rerender } = render(
            <AuthContextProvider {...authContextProps}>
                <ForgotPasswordScreenBase
                    emailLabel="Email Address"
                    initialEmailValue={'test'}
                    emailValidator={(email: string): boolean | string => {
                        if (email?.length > 6) {
                            return true;
                        }
                        return 'Please enter a valid email';
                    }}
                    slots={{ SuccessScreen: (): JSX.Element => <Box>Success</Box> }}
                />
            </AuthContextProvider>
        );

        const verifyEmailInput = getByLabelText('Email Address');
        fireEvent.change(verifyEmailInput, { target: { value: 't' } });
        fireEvent.blur(verifyEmailInput);

        // Rerender to ensure state changes have taken effect
        rerender(
            <AuthContextProvider {...authContextProps}>
                <ForgotPasswordScreenBase
                    emailLabel="Email Address"
                    emailValidator={(email: string): boolean | string => {
                        if (email?.length > 6) {
                            return true;
                        }
                        return 'Please enter a valid email';
                    }}
                    slots={{ SuccessScreen: (): JSX.Element => <Box>Success</Box> }}
                />
            </AuthContextProvider>
        );
        expect(verifyEmailInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set error state when email is long enough', () => {
        const { getByLabelText, rerender } = render(
            <AuthContextProvider {...authContextProps}>
                <ForgotPasswordScreenBase
                    emailLabel="Email Address"
                    initialEmailValue={'test'}
                    emailValidator={(email: string): boolean | string => {
                        if (email?.length > 2) {
                            return true;
                        }
                        return 'Please enter a valid email';
                    }}
                    slots={{ SuccessScreen: (): JSX.Element => <Box>Success</Box> }}
                />
            </AuthContextProvider>
        );

        const verifyEmailInput = getByLabelText('Email Address');
        fireEvent.change(verifyEmailInput, { target: { value: 'test' } });
        fireEvent.blur(verifyEmailInput);

        // Rerender to ensure state changes have taken effect
        rerender(
            <AuthContextProvider {...authContextProps}>
                <ForgotPasswordScreenBase
                    emailLabel="Email Address"
                    emailValidator={(email: string): boolean | string => {
                        if (email?.length > 1) {
                            return true;
                        }
                        return 'Please enter a valid email';
                    }}
                    slots={{ SuccessScreen: (): JSX.Element => <Box>Success</Box> }}
                />
            </AuthContextProvider>
        );
        expect(verifyEmailInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('calls onNext when the next button is clicked', () => {
        const { getByText } = render(
            <AuthContextProvider {...authContextProps}>
                <ForgotPasswordScreenBase
                    WorkflowCardActionsProps={{
                        onNext: mockOnNext(),
                        showNext: true,
                        nextLabel: 'Next',
                        canGoNext: true,
                        currentStep: 1,
                        totalSteps: 6,
                    }}
                    slots={{ SuccessScreen: (): JSX.Element => <Box>Success</Box> }}
                />
            </AuthContextProvider>
        );

        const nextButton = getByText('Next');
        fireEvent.click(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });

    it('pre-populates the email input field with initialEmailValue', () => {
        const { getByLabelText } = render(
            <AuthContextProvider {...authContextProps}>
                <ForgotPasswordScreenBase
                    emailLabel="Email Address"
                    initialEmailValue="te"
                    emailValidator={(email: string): boolean | string => {
                        if (email?.length > 1) {
                            return true;
                        }
                        return 'Please enter a valid email';
                    }}
                    slots={{ SuccessScreen: (): JSX.Element => <Box>Success</Box> }}
                />
            </AuthContextProvider>
        );

        const emailInput = getByLabelText('Email Address');
        expect(emailInput).toHaveValue('te');
    });

    it('displays title, instructions and emailLabel correctly', () => {
        const { getByText } = render(
            <AuthContextProvider {...authContextProps}>
                <ForgotPasswordScreenBase
                    WorkflowCardHeaderProps={{ title: 'Title' }}
                    WorkflowCardInstructionProps={{ instructions: 'Instructions' }}
                    emailLabel="Email Address"
                    slots={{ SuccessScreen: (): JSX.Element => <Box>Success</Box> }}
                />
            </AuthContextProvider>
        );

        expect(getByText('Title')).toBeInTheDocument();
        expect(getByText('Instructions')).toBeInTheDocument();
        expect(getByText('Email Address')).toBeInTheDocument();
    });
});
