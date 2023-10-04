import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent, RenderResult } from '@testing-library/react';
import { AccountDetailsScreenBase } from './AccountDetailsScreenBase';
import { AccountDetailsScreenProps } from './types';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

const renderer = (props?: AccountDetailsScreenProps): RenderResult =>
    render(
        <RegistrationContextProvider {...registrationContextProviderProps}>
            <RegistrationWorkflow initialScreenIndex={0}>
                <AccountDetailsScreenBase {...props} />
            </RegistrationWorkflow>
        </RegistrationContextProvider>
    );

describe('AccountDetailsScreenBase tests', () => {
    renderer();
    it('renders without crashing', () => {
        render(<AccountDetailsScreenBase />);
    });

    it('testing initial values', () => {
        const { getByLabelText } = render(
            <AccountDetailsScreenBase
                firstNameLabel="First Name"
                lastNameLabel="Last Name"
                initialFirstName="Test First Name"
                initialLastName="Test Last Name"
            />
        );

        const firstNameInput = getByLabelText('First Name');
        expect(firstNameInput).toHaveValue('Test First Name');

        const lastNameInput = getByLabelText('Last Name');
        expect(lastNameInput).toHaveValue('Test Last Name');
    });

    it('input onChange callback', () => {
        const { getByLabelText } = render(
            <AccountDetailsScreenBase firstNameLabel="First Name" lastNameLabel="Last Name" />
        );

        const firstNameInput = getByLabelText('First Name');
        expect(firstNameInput).toHaveValue('');
        fireEvent.change(firstNameInput, { target: { value: 'Test First Name' } });
        expect(firstNameInput).toHaveValue('Test First Name');

        const lastNameInput = getByLabelText('Last Name');
        expect(lastNameInput).toHaveValue('');
        fireEvent.change(lastNameInput, { target: { value: 'Test Last Name' } });
        expect(lastNameInput).toHaveValue('Test Last Name');
    });

    it('error on onChange', () => {
        const { getByLabelText } = render(
            <AccountDetailsScreenBase
                firstNameLabel="First Name"
                firstNameValidator={(firstName: string): boolean | string => {
                    if (firstName?.length > 2) {
                        return true;
                    }
                    return 'Please enter a valid First Name';
                }}
                lastNameLabel="Last Name"
                lastNameValidator={(lastName: string): boolean | string => {
                    if (lastName?.length > 2) {
                        return true;
                    }
                    return 'Please enter a valid Last Name';
                }}
            />
        );

        const firstNameInput = getByLabelText('First Name');
        expect(firstNameInput).toHaveValue('');
        fireEvent.change(firstNameInput, { target: { value: 'AA' } });
        expect(firstNameInput).toHaveValue('AA');

        const lastNameInput = getByLabelText('Last Name');
        expect(lastNameInput).toHaveValue('');
        fireEvent.change(lastNameInput, { target: { value: 'YY' } });
        expect(lastNameInput).toHaveValue('YY');
    });

    it('passing all the props', () => {
        render(
            <AccountDetailsScreenBase
                WorkflowCardHeaderProps={{ title: 'Test' }}
                WorkflowCardInstructionProps={{
                    instructions: 'Enter your details below to complete account creation.',
                }}
                firstNameLabel="First Name"
                initialFirstName="Test First Name"
                firstNameValidator={(): any => {}}
                lastNameLabel="Last Name"
                initialLastName="Test Last Name"
                lastNameValidator={(): any => {}}
                WorkflowCardActionsProps={{
                    canGoPrevious: true,
                    showPrevious: true,
                    previousLabel: 'Back',
                    onPrevious: (): void => {},
                    canGoNext: true,
                    showNext: true,
                    nextLabel: 'Next',
                    onNext: (): void => {},
                    totalSteps: 5,
                    currentStep: 2,
                }}
            />
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    });
});
