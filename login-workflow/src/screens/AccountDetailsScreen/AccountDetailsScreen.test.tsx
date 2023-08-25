import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { cleanup, render, screen, RenderResult, fireEvent } from '@testing-library/react';
import { AccountDetailsScreen } from './AccountDetailsScreen';
import { RegistrationContextProvider } from '../../contexts';
import { AccountDetailsScreenProps } from './types';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('Account Details Screen', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: AccountDetailsScreenProps): RenderResult =>
        render(
            <BrowserRouter>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <AccountDetailsScreen {...props} />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </BrowserRouter>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Account Details')).toBeInTheDocument();
    });

    it('should update values when passed as props', () => {
        renderer({
            WorkflowCardHeaderProps: {
                title: 'Test Title',
            },
        });

        expect(screen.queryByText('Account Details')).toBeNull();
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should update instruction when passed as props', () => {
        renderer({
            WorkflowCardInstructionProps: {
                instructions: 'Test Instruction',
            },
        });

        expect(screen.queryByText('Enter your details below to complete account creation.')).toBeNull();
        expect(screen.getByText('Test Instruction')).toBeInTheDocument();
    });

    it('should call onNext, when Next button clicked', () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });

        const firstNameInput = getByLabelText('First Name');
        fireEvent.change(firstNameInput, { target: { value: 'Test First Name' } });
        fireEvent.blur(firstNameInput);

        const lastNameInput = getByLabelText('Last Name');
        fireEvent.change(lastNameInput, { target: { value: 'Test Last Name' } });
        fireEvent.blur(lastNameInput);

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should call onPrevious, when Back button clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockOnPrevious(),
                showPrevious: true,
                previousLabel: 'Back',
            },
        });

        const backButton = screen.getByText('Back');
        expect(backButton).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
        fireEvent.click(backButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });
});
