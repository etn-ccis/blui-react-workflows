import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult, act } from '@testing-library/react';
import { CreatePasswordScreen } from './CreatePasswordScreen';
import { CreatePasswordScreenProps } from './types';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

const passwordRequirements = [
    {
        description: 'Check 1',
        regex: /^.{3,5}$/,
    },
    {
        description: 'Check 2',
        regex: /[a-z]+/,
    },
    {
        description: '8-16 Characters',
        regex: /^.{8,16}$/,
    },
    {
        description: 'One number',
        regex: /\d+/,
    },
    {
        description: 'One uppercase letter',
        regex: /[A-Z]+/,
    },
    {
        description: 'One lowercase letter',
        regex: /[a-z]+/,
    },
    {
        description: 'One special character',
        regex: /[!@#$%^&*(),.?":{}|<>]+/,
    },
];

afterEach(cleanup);

describe('Create Password Screen', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: CreatePasswordScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <CreatePasswordScreen {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Create Password')).toBeInTheDocument();
    });

    it('should display default props', () => {
        renderer();

        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.queryByLabelText('Password')).toBeEmptyDOMElement();
        expect(screen.queryByLabelText('Confirm Password')).toBeEmptyDOMElement();
    });

    it('should display default password requirements', () => {
        renderer();

        expect(screen.getByText('8-16 Characters')).toBeInTheDocument();
        expect(screen.getByText('One number')).toBeInTheDocument();
        expect(screen.getByText('One uppercase letter')).toBeInTheDocument();
        expect(screen.getByText('One lowercase letter')).toBeInTheDocument();
        expect(screen.getByText('One special character')).toBeInTheDocument();
    });

    it('should call onNext, when Next button clicked', async () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                onPasswordChange: jest.fn(),
                passwordRequirements: passwordRequirements,
            },
        });

        const passwordField = getByLabelText('Password');
        const confirmPasswordField = getByLabelText('Confirm Password');

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

    it('should enable next button, when passwordRequirements prop is empty', () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                onPasswordChange: jest.fn(),
                passwordRequirements: [],
            },
        });

        const passwordField = getByLabelText('Password');
        const confirmPasswordField = getByLabelText('Confirm Password');

        fireEvent.change(passwordField, { target: { value: 'A' } });
        fireEvent.blur(passwordField);
        fireEvent.change(confirmPasswordField, { target: { value: 'A' } });
        fireEvent.blur(confirmPasswordField);

        expect(screen.getByText(/Next/i)).toBeEnabled();
    });

    it('should call onPrevious, when Back button clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockOnPrevious(),
                showPrevious: true,
                previousLabel: 'Back',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                onPasswordChange: jest.fn(),
                passwordRequirements: passwordRequirements,
            },
        });

        const backButton = screen.getByText('Back');
        expect(backButton).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
        fireEvent.click(backButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });

    it('renders with custom and default password requirements', () => {
        renderer();

        expect(passwordRequirements).toEqual([
            {
                description: 'Check 1',
                regex: /^.{3,5}$/,
            },
            {
                description: 'Check 2',
                regex: /[a-z]+/,
            },
            {
                description: '8-16 Characters',
                regex: /^.{8,16}$/,
            },
            {
                description: 'One number',
                regex: /\d+/,
            },
            {
                description: 'One uppercase letter',
                regex: /[A-Z]+/,
            },
            {
                description: 'One lowercase letter',
                regex: /[a-z]+/,
            },
            {
                description: 'One special character',
                regex: /[!@#$%^&*(),.?":{}|<>]+/,
            },
        ]);
    });
});
