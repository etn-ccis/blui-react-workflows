import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { CreateNewOrgScreen } from './CreateNewOrgScreen';
import { CreateNewOrgScreenProps } from './types';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('Create New Org Screen', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: CreateNewOrgScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <CreateNewOrgScreen {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Create an Organization')).toBeInTheDocument();
        expect(screen.getByLabelText('Organization Name')).toBeInTheDocument();
    });

    it('does not set error state when organization name is long enough', () => {
        const { getByLabelText } = renderer();
        const verifyOrgNameInput = getByLabelText('Organization Name');
        fireEvent.change(verifyOrgNameInput, { target: { value: 'Acme inc.' } });
        fireEvent.blur(verifyOrgNameInput);

        expect(verifyOrgNameInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('calls onNext when the next button is clicked', () => {
        const { getByLabelText, getByText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });

        const orgNameInput = getByLabelText('Organization Name');
        fireEvent.change(orgNameInput, { target: { value: 'Acme inc.' } });
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

    it('pre-populates the organization name input field with initialValue', () => {
        const { getByLabelText } = renderer();

        const orgNameInput = getByLabelText('Organization Name');
        fireEvent.change(orgNameInput, { target: { value: 'Acme inc.' } });
        expect(orgNameInput).toHaveValue('Acme inc.');
    });
});
