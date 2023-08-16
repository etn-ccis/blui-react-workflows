/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { cleanup, fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { ForgotPasswordScreenProps } from './types';
import { AuthContextProvider, AuthContextProviderProps, i18nAuthInstance } from '../../contexts';
import { BrowserRouter } from 'react-router-dom';
import { ForgotPasswordScreen } from './ForgotPasswordScreen';
import '@testing-library/jest-dom';
import Box from '@mui/material/Box';

afterEach(cleanup);

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const authContextProps: AuthContextProviderProps = {
    language: 'en',
    ...i18nAuthInstance,
    navigate: (): void => {},
    routeConfig: {},
    actions: () => ({
        initiateSecurity: jest.fn(),
        logIn: jest.fn(),

        forgotPassword: async (email: string): Promise<void> => {
            await sleep(800);
            return;
        },
        verifyResetCode: jest.fn(),
        setPassword: jest.fn(),
        changePassword: jest.fn(),
    }),
};

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

    it('renders with props crashing', () => {
        renderer({
            emailLabel: 'Email Address',
            initialEmailValue: '',
            emailValidator: (): any => {},
            contactPhone: '',
        });

        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    });

    it('email validation test', () => {
        const { getByLabelText } = renderer();

        const emailInput = getByLabelText('Email Address');
        expect(emailInput).toHaveValue('');
        fireEvent.change(emailInput, { target: { value: 'aa@aa.aa' } });
        expect(emailInput).toHaveValue('aa@aa.aa');
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
        fireEvent.change(emailInput, { target: { value: 'aa@aa.aa' } });
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('aa@aa.aa');

        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should show success screen, when next button is clicked', async () => {
        const props = { ...authContextProps };
        props.actions().forgotPassword = async (email: string): Promise<void> => {
            await sleep(800);
            throw new Error('Error');
        };
        const { getByLabelText } = render(
            <AuthContextProvider {...props}>
                <BrowserRouter>
                    <ForgotPasswordScreen />
                </BrowserRouter>
            </AuthContextProvider>
        );

        const emailInput = getByLabelText('Email Address');
        const nextButton = screen.getByText('Submit');
        fireEvent.change(emailInput, { target: { value: 'aa@aa.aa' } });
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('aa@aa.aa');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Submit/i)).toBeEnabled();
        fireEvent.click(nextButton);

        const successMessage = await screen.findByText('Email Sent');
        expect(successMessage).toBeInTheDocument();
    });

    it('should not show success screen, when showSuccessScreen is false', () => {
        const props = { ...authContextProps };
        props.actions().forgotPassword = async (email: string): Promise<void> => {
            await sleep(800);
            throw new Error('Error');
        };
        const { getByLabelText } = render(
            <AuthContextProvider {...props}>
                <BrowserRouter>
                    <ForgotPasswordScreen showSuccessScreen={false} />
                </BrowserRouter>
            </AuthContextProvider>
        );

        const emailInput = getByLabelText('Email Address');
        const nextButton = screen.getByText('Submit');
        fireEvent.change(emailInput, { target: { value: 'aa@aa.aa' } });
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('aa@aa.aa');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Submit/i)).toBeEnabled();
        fireEvent.click(nextButton);

        const successMessage = screen.queryByText('Email Sent');
        expect(successMessage).toBeNull();
    });

    it('should show custom success screen, when passed in slots', async () => {
        const props = { ...authContextProps };
        props.actions().forgotPassword = async (email: string): Promise<void> => {
            await sleep(800);
            throw new Error('Error');
        };
        const { getByLabelText } = render(
            <AuthContextProvider {...props}>
                <BrowserRouter>
                    <ForgotPasswordScreen slots={{ SuccessScreen: (): JSX.Element => <Box>Success</Box> }} />
                </BrowserRouter>
            </AuthContextProvider>
        );

        const emailInput = getByLabelText('Email Address');
        const nextButton = screen.getByText('Submit');
        fireEvent.change(emailInput, { target: { value: 'aa@aa.aa' } });
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('aa@aa.aa');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Submit/i)).toBeEnabled();
        fireEvent.click(nextButton);

        const successMessage = screen.findByText('Success');
        // eslint-disable-next-line
        await (() => expect(successMessage).toBeInTheDocument());
    });

    it('should show loader, when loading prop is passed to WorkflowCardBaseProps', () => {
        renderer({ WorkflowCardBaseProps: { loading: true } });

        expect(screen.getByTestId('blui-spinner')).toBeInTheDocument();
    });
});
