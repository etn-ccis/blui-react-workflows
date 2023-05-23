import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { AccountDetailsScreenBase } from './AccountDetailsScreenBase';

afterEach(cleanup);

describe('AccountDetailsScreenBase tests', () => {
    it('renders without crashing', () => {
        render(<AccountDetailsScreenBase />);
    });

    it('testing initial values', () => {
        const { getByLabelText } = render(
            <AccountDetailsScreenBase
                firstNameLabel="First Name"
                lastNameLabel="Last Name"
                initialFirstName="Manu"
                initialLastName="Loki"
            />
        );

        const firstNameInput = getByLabelText('First Name');
        expect(firstNameInput).toHaveValue('Manu');

        const lastNameInput = getByLabelText('Last Name');
        expect(lastNameInput).toHaveValue('Loki');
    });

    it('input onChange callback', () => {
        const { getByLabelText } = render(
            <AccountDetailsScreenBase firstNameLabel="First Name" lastNameLabel="Last Name" />
        );

        const firstNameInput = getByLabelText('First Name');
        expect(firstNameInput).toHaveValue('');
        fireEvent.change(firstNameInput, { target: { value: 'Manoj' } });
        expect(firstNameInput).toHaveValue('Manoj');

        const lastNameInput = getByLabelText('Last Name');
        expect(lastNameInput).toHaveValue('');
        fireEvent.change(lastNameInput, { target: { value: 'Lokesh' } });
        expect(lastNameInput).toHaveValue('Lokesh');
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
        fireEvent.change(firstNameInput, { target: { value: 'Ma' } });
        expect(firstNameInput).toHaveValue('Ma');

        const lastNameInput = getByLabelText('Last Name');
        expect(lastNameInput).toHaveValue('');
        fireEvent.change(lastNameInput, { target: { value: 'Lo' } });
        expect(lastNameInput).toHaveValue('Lo');
    });

    it('passing all the props', () => {
        render(
            <AccountDetailsScreenBase
                WorkflowCardHeaderProps={{ title: 'Test' }}
                WorkflowCardInstructionProps={{
                    instructions: 'Enter your details below to complete account creation.',
                }}
                firstNameLabel="First Name"
                initialFirstName="Manoj"
                firstNameValidator={(): any => {}}
                lastNameLabel="Last Name"
                initialLastName="Lokesh"
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
