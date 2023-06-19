import React from 'react';
import { cleanup, fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { ForgotPasswordScreenProps } from './types';
import { AuthContextProvider } from '../../contexts';
import { defaultProps as authContextProps } from '../../contexts/AuthContext/AuthContextProvider.test';
import { BrowserRouter } from 'react-router-dom';
import { ForgotPasswordScreen } from './ForgotPasswordScreen';

afterEach(cleanup);

describe('Forgot Password Screen tests', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: ForgotPasswordScreenProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProps}>
                <BrowserRouter>
                    <ForgotPasswordScreen {...props} />
                </BrowserRouter>
            </AuthContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    });

    it('email validation test', () => {
        const { getByLabelText } = renderer();

        const emailInput = getByLabelText('Email Address');
        expect(emailInput).toHaveValue('');
        fireEvent.change(emailInput, { target: { value: 'manojlokesh@eaton.com' } });
        expect(emailInput).toHaveValue('manojlokesh@eaton.com');
    });

    it('firing onPrevious Callback functions', () => {
        renderer({
            WorkflowCardActionsProps: {
                canGoPrevious: true,
                showPrevious: true,
                previousLabel: 'Back',
                onPrevious: mockOnPrevious(),
            },
        });

        const previousButton = screen.getByText('Back');
        expect(previousButton).toBeInTheDocument();
        fireEvent.click(previousButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });

    it('firing onNext Callback functions', () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                canGoNext: true,
                showNext: true,
                nextLabel: 'Next',
                onNext: mockOnNext(),
            },
        });

        const emailInput = getByLabelText('Email Address');
        const nextButton = screen.getByText('Next');
        expect(emailInput).toHaveValue('');
        expect(screen.getByText(/Next/i)).toBeDisabled();
        fireEvent.change(emailInput, { target: { value: 'manojlokesh@eaton.com' } });
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('manojlokesh@eaton.com');

        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should show error dialog, when next button is clicked and error is thrown', () => {
        const { getByLabelText, rerender } = renderer();

        const emailInput = getByLabelText('Email Address');
        const nextButton = screen.getByText('Next');
        fireEvent.change(emailInput, { target: { value: 'manojlokesh@eaton.com' } });
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('manojlokesh@eaton.com');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);

        rerender(
            <AuthContextProvider language={'en'} routeConfig={{}} navigate={jest.fn()} actions={jest.fn()}>
                <BrowserRouter>
                    <ForgotPasswordScreen />
                </BrowserRouter>
            </AuthContextProvider>
        );

        expect(screen.getByText('Could not reset your password at this time.')).toBeInTheDocument();
    });

    it('should dismiss error dialog, when okay button is clicked', () => {
        const { getByLabelText, rerender } = renderer();

        const emailInput = getByLabelText('Email Address');
        const nextButton = screen.getByText('Next');
        fireEvent.change(emailInput, { target: { value: 'manojlokesh@eaton.com' } });
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('manojlokesh@eaton.com');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);

        rerender(
            <AuthContextProvider language={'en'} routeConfig={{}} navigate={jest.fn()} actions={jest.fn()}>
                <BrowserRouter>
                    <ForgotPasswordScreen WorkflowCardHeaderProps={{ title: 'Test Title' }} />
                </BrowserRouter>
            </AuthContextProvider>
        );

        expect(screen.getByText('Could not reset your password at this time.')).toBeInTheDocument();
        expect(screen.getByText('OKAY')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        fireEvent.click(screen.getByText('OKAY'));
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('should loader, when loading prop is passed to WorkflowCardBaseProps', () => {
        renderer({ WorkflowCardBaseProps: { loading: true } });

        expect(screen.getByTestId('blui-spinner')).toBeInTheDocument();
    });
});
