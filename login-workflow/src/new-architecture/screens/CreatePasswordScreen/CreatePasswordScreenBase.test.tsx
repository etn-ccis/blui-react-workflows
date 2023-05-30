import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { CreatePasswordScreenBase } from './CreatePasswordScreenBase';
import { SetPasswordProps } from '../../components/SetPassword/types';

afterEach(cleanup);

const defaultProps: SetPasswordProps = {
    newPasswordLabel: '',
    confirmPasswordLabel: '',
    initialNewPasswordValue: '',
    initialConfirmPasswordValue: '',
    onPasswordChange: jest.fn(),
};

describe('Create Password Screen Base', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    it('renders without crashing', () => {
        render(
            <CreatePasswordScreenBase
                WorkflowCardHeaderProps={{ title: 'Create Password' }}
                    WorkflowCardInstructionProps={{
                        instructions:
                            'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
                    }}
                    PasswordProps={defaultProps}
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: 'Next',
                        canGoNext:true,
                        showPrevious: true,
                        previousLabel: 'Back',
                        canGoPrevious: true,
                        currentStep: 2,
                        totalSteps: 6,
                        onNext: mockOnNext(),
                    }}
            ></CreatePasswordScreenBase>
        );
        expect(screen.getByText('Create Password')).toBeInTheDocument();
        expect(screen.getByText('Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
    });

    it('calls onNext when the next button is clicked', () => {
        const { getByText } = render(
            <CreatePasswordScreenBase
                PasswordProps={defaultProps}
                WorkflowCardActionsProps={{
                    onNext: mockOnNext(),
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
});
