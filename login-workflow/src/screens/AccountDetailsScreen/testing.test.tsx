import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, RenderResult, fireEvent, act } from '@testing-library/react';
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
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <AccountDetailsScreen {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

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
        void ((): void =>
        act(() => {
            fireEvent.click(nextButton);
        }));
        expect(mockOnNext).toHaveBeenCalled();
    });
});
