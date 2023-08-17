import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { ResetPasswordScreenBase } from './ResetPasswordScreenBase';

afterEach(cleanup);

describe('Forgot Password Screen Base', () => {
    it('renders without crashing', () => {
        render(
            <ResetPasswordScreenBase
                WorkflowCardHeaderProps={{ title: 'Reset Password' }}
                WorkflowCardInstructionProps={{
                    instructions: 'Reset Password instructions',
                }}
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
                PasswordProps={{
                    onPasswordChange: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    newPasswordLabel: '',
                    initialNewPasswordValue: '',
                    confirmPasswordLabel: '',
                    initialConfirmPasswordValue: '',
                    passwordRequirements: [],
                    passwordRef: undefined,
                    confirmRef: undefined,
                    onSubmit: function (): void {
                        throw new Error('Function not implemented.');
                    },
                }}
                showSuccessScreen={false}
            />
        );
        expect(screen.getByText('Reset Password')).toBeInTheDocument();
        expect(screen.getByText('Reset Password instructions')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
    });

    it('show success screen when showSuccessScreen is true', () => {
        render(
            <ResetPasswordScreenBase
                WorkflowCardHeaderProps={{ title: 'Reset Password' }}
                WorkflowCardInstructionProps={{
                    instructions: 'Reset Password instructions',
                }}
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
                PasswordProps={{
                    onPasswordChange: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    newPasswordLabel: '',
                    initialNewPasswordValue: '',
                    confirmPasswordLabel: '',
                    initialConfirmPasswordValue: '',
                    passwordRequirements: [],
                    passwordRef: undefined,
                    confirmRef: undefined,
                    onSubmit: function (): void {
                        throw new Error('Function not implemented.');
                    },
                }}
                showSuccessScreen={true}
                slots={{
                    SuccessScreen: (): JSX.Element => (
                        <div>
                            <p>Success Screen</p>
                        </div>
                    ),
                }}
            />
        );
        expect(screen.getByText('Success Screen')).toBeInTheDocument();
    });
});
