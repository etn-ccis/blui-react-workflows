import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { CreateNewOrgScreenBase } from './CreateNewOrgScreenBase';
import { CreateNewOrgScreenProps } from './types';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('Create New Organization Screen Base', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    const renderer = (props?: CreateNewOrgScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <CreateNewOrgScreenBase {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

    it('renders without crashing', () => {
        renderer();
        render(
            <CreateNewOrgScreenBase
                WorkflowCardHeaderProps={{ title: 'Join an Organization' }}
                WorkflowCardInstructionProps={{
                    instructions: 'Create new organization instructions',
                }}
                initialValue={'Acme Inc.'}
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
            ></CreateNewOrgScreenBase>
        );
        expect(screen.getByText('Join an Organization')).toBeInTheDocument();
        expect(screen.getByText('Create new organization instructions')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
    });

    it('sets error state when organization name is too short', () => {
        const { getByLabelText, rerender } = render(
            <CreateNewOrgScreenBase
                orgNameLabel="Organization Name"
                initialValue={'test'}
                orgNameValidator={(orgName: string): boolean | string => {
                    if (orgName?.length > 6) {
                        return true;
                    }
                    return 'Organization Name';
                }}
            />
        );

        const verifyOrgNameInput = getByLabelText('Organization Name');
        fireEvent.change(verifyOrgNameInput, { target: { value: 't' } });
        fireEvent.blur(verifyOrgNameInput);

        // Rerender to ensure state changes have taken effect
        rerender(
            <CreateNewOrgScreenBase
                orgNameLabel="Organization Name"
                orgNameValidator={(orgName: string): boolean | string => {
                    if (orgName?.length > 6) {
                        return true;
                    }
                    return 'Please enter a valid organization name';
                }}
            />
        );
        expect(verifyOrgNameInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set error state when organization name is long enough', () => {
        const { getByLabelText, rerender } = render(
            <CreateNewOrgScreenBase
                orgNameLabel="Organization Name"
                initialValue={'test'}
                orgNameValidator={(orgName: string): boolean | string => {
                    if (orgName?.length > 2) {
                        return true;
                    }
                    return 'Please enter a valid organization name';
                }}
            />
        );

        const verifyEmailInput = getByLabelText('Organization Name');
        fireEvent.change(verifyEmailInput, { target: { value: 'test' } });
        fireEvent.blur(verifyEmailInput);

        // Rerender to ensure state changes have taken effect
        rerender(
            <CreateNewOrgScreenBase
                orgNameLabel="Organization Name"
                orgNameValidator={(orgName: string): boolean | string => {
                    if (orgName?.length > 1) {
                        return true;
                    }
                    return 'Please enter a valid organization name';
                }}
            />
        );
        expect(verifyEmailInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('calls onNext when the next button is clicked', () => {
        const { getByText } = render(
            <CreateNewOrgScreenBase
                WorkflowCardActionsProps={{
                    onNext: mockOnNext(),
                    showNext: true,
                    nextLabel: 'Next',
                    canGoNext: true,
                    currentStep: 1,
                    totalSteps: 6,
                }}
            />
        );

        const nextButton = getByText('Next');
        fireEvent.click(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });

    it('pre-populates the organization name input field with initialValue', () => {
        const { getByLabelText } = render(
            <CreateNewOrgScreenBase
                orgNameLabel="Organization Name"
                initialValue="Acme"
                orgNameValidator={(orgName: string): boolean | string => {
                    if (orgName?.length > 1) {
                        return true;
                    }
                    return 'Please enter a organization name';
                }}
            />
        );

        const orgNameInput = getByLabelText('Organization Name');
        expect(orgNameInput).toHaveValue('Acme');
    });

    it('displays title, instructions and orgNameLabel correctly', () => {
        const { getByText } = render(
            <CreateNewOrgScreenBase
                WorkflowCardHeaderProps={{ title: 'Title' }}
                WorkflowCardInstructionProps={{ instructions: 'Instructions' }}
                orgNameLabel="Organization Name"
            />
        );

        expect(getByText('Title')).toBeInTheDocument();
        expect(getByText('Instructions')).toBeInTheDocument();
        expect(getByText('Organization Name')).toBeInTheDocument();
    });
});
