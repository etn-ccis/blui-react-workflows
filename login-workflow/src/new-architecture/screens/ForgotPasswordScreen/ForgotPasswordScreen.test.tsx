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
        const { getByLabelText, getByTestId } = renderer({
            WorkflowCardActionsProps: {
                showNext: true,
                nextLabel: 'Next',
                onNext: mockOnNext(),
            },
        });

        const emailInput = getByLabelText('Email Address');
        expect(emailInput).toHaveValue('');
        fireEvent.change(emailInput, { target: { value: 'manojlokesh@eaton.com' } });
        expect(emailInput).toHaveValue('manojlokesh@eaton.com');

        const nextButton = getByTestId('BluiWorkflowCardActions-nextButton');
        expect(nextButton).toBeInTheDocument();
        fireEvent.click(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });
});
