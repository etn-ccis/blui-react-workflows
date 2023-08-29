import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { CreateAccountScreen } from './CreateAccountScreen';
import { CreateAccountScreenProps } from './types';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('Create Account Screen', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: CreateAccountScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <CreateAccountScreen {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Create an Account')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });

    it('sets error state when email is too short', () => {
        const { getByLabelText } = renderer();

        const verifyEmailInput = getByLabelText('Email Address');
        fireEvent.change(verifyEmailInput, { target: { value: 't' } });
        fireEvent.blur(verifyEmailInput);

        expect(verifyEmailInput).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });

    it('does not set error state when email is long enough', () => {
        const { getByLabelText } = renderer();
        const verifyEmailInput = getByLabelText('Email Address');
        fireEvent.change(verifyEmailInput, { target: { value: 'test@test.net' } });
        fireEvent.blur(verifyEmailInput);

        expect(verifyEmailInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('calls onNext when the next button is clicked', () => {
        const { getByLabelText, getByText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });

        const emailInput = getByLabelText('Email Address');
        fireEvent.change(emailInput, { target: { value: 'Abcd@123.net' } });
        const nextButton = getByText('Next');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });

    it('calls onPrevious when the back button is clicked', () => {
        const { getByText } = renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockOnPrevious(),
                showPrevious: true,
                previousLabel: 'Back',
            },
        });

        const backButton = getByText('Back');
        expect(backButton).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
        fireEvent.click(backButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });

    it('pre-populates the email input field with initialValue', () => {
        const { getByLabelText } = renderer();

        const emailInput = getByLabelText('Email Address');
        fireEvent.change(emailInput, { target: { value: 'Abcd@123' } });
        expect(emailInput).toHaveValue('Abcd@123');
    });

    it('displays title, instructions and emailLabel correctly', () => {
        const { getByText } = renderer();

        expect(getByText('Create an Account')).toBeInTheDocument();
        expect(
            getByText(
                'To register for an Eaton account, enter the required information below. You will need to verify your email address to continue.'
            )
        ).toBeInTheDocument();
        expect(getByText('Email Address')).toBeInTheDocument();
    });
});
