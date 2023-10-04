import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { CreateAccountScreenBase } from './CreateAccountScreenBase';
import { CreateAccountScreenProps } from './types';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('Create Account Screen Base', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    const renderer = (props?: CreateAccountScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <CreateAccountScreenBase {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

    it('renders without crashing', () => {
        renderer();
        render(
            <CreateAccountScreenBase
                WorkflowCardHeaderProps={{ title: 'Create Account' }}
                WorkflowCardInstructionProps={{
                    instructions: 'Create account instructions',
                }}
                initialValue={'test@email.net'}
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
            ></CreateAccountScreenBase>
        );
        expect(screen.getByText('Create Account')).toBeInTheDocument();
        expect(screen.getByText('Create account instructions')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
    });

    it('sets error state when email is too short', () => {
        const { getByLabelText, rerender } = render(
            <CreateAccountScreenBase
                emailLabel="Email Address"
                initialValue={'test'}
                emailValidator={(email: string): boolean | string => {
                    if (email?.length > 6) {
                        return true;
                    }
                    return 'Please enter a valid email';
                }}
            />
        );

        const verifyEmailInput = getByLabelText('Email Address');
        fireEvent.change(verifyEmailInput, { target: { value: 't' } });
        fireEvent.blur(verifyEmailInput);

        // Rerender to ensure state changes have taken effect
        rerender(
            <CreateAccountScreenBase
                emailLabel="Email Address"
                emailValidator={(email: string): boolean | string => {
                    if (email?.length > 6) {
                        return true;
                    }
                    return 'Please enter a valid email';
                }}
            />
        );
        expect(verifyEmailInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set error state when email is long enough', () => {
        const { getByLabelText, rerender } = render(
            <CreateAccountScreenBase
                emailLabel="Email Address"
                initialValue={'test'}
                emailValidator={(email: string): boolean | string => {
                    if (email?.length > 2) {
                        return true;
                    }
                    return 'Please enter a valid email';
                }}
            />
        );

        const verifyEmailInput = getByLabelText('Email Address');
        fireEvent.change(verifyEmailInput, { target: { value: 'test' } });
        fireEvent.blur(verifyEmailInput);

        // Rerender to ensure state changes have taken effect
        rerender(
            <CreateAccountScreenBase
                emailLabel="Email Address"
                emailValidator={(email: string): boolean | string => {
                    if (email?.length > 1) {
                        return true;
                    }
                    return 'Please enter a valid email';
                }}
            />
        );
        expect(verifyEmailInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('calls onNext when the next button is clicked', () => {
        const { getByText } = render(
            <CreateAccountScreenBase
                WorkflowCardActionsProps={{
                    onNext: mockOnNext(),
                    showNext: true,
                    nextLabel: 'Next',
                    canGoNext: true,
                    currentStep: 1,
                    totalSteps: 6,
                }}
            />
        );

        const nextButton = getByText('Next');
        fireEvent.click(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });

    it('pre-populates the email input field with initialValue', () => {
        const { getByLabelText } = render(
            <CreateAccountScreenBase
                emailLabel="Email Address"
                initialValue="te"
                emailValidator={(email: string): boolean | string => {
                    if (email?.length > 1) {
                        return true;
                    }
                    return 'Please enter a valid email';
                }}
            />
        );

        const emailInput = getByLabelText('Email Address');
        expect(emailInput).toHaveValue('te');
    });

    it('displays title, instructions and emailLabel correctly', () => {
        const { getByText } = render(
            <CreateAccountScreenBase
                WorkflowCardHeaderProps={{ title: 'Title' }}
                WorkflowCardInstructionProps={{ instructions: 'Instructions' }}
                emailLabel="Email Address"
            />
        );

        expect(getByText('Title')).toBeInTheDocument();
        expect(getByText('Instructions')).toBeInTheDocument();
        expect(getByText('Email Address')).toBeInTheDocument();
    });
});
