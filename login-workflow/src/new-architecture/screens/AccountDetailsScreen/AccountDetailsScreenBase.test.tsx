import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import { AccountDetailsScreenBase } from './AccountDetailsScreenBase';

afterEach(cleanup);

describe('AccountDetailsScreenBase tests', () => {
    it('renders without crashing', () => {
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
                    canGoNext: false,
                    showNext: true,
                    nextLabel: 'Next',
                    onNext: (): void => {},
                    totalSteps: 5,
                    currentStep: 2,
                }}
            />
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});

describe('AccountDetailsScreenBase tests', () => {
    it('renders without crashing', () => {
        render(
            <AccountDetailsScreenBase
                firstNameLabel="First Name"
                initialFirstName=""
                firstNameValidator={(): any => {}}
                lastNameLabel="Last Name"
                initialLastName=""
                lastNameValidator={(): any => {}}
            />
        );
    });
});
