import React from 'react';
import { AccountDetailsScreenBase, AccountDetailsScreenProps } from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router';

export const AccountDetailsScreenBaseTest: React.FC<AccountDetailsScreenProps> = () => {
    const navigate = useNavigate();

    const firstNameValidator = (name: string): boolean | string => {
        if (name?.length > 4) {
            return true;
        }
        return 'First name must be at least 5 characters';
    };

    const lastNameValidator = (name: string): boolean | string => {
        if (name?.length > 2) {
            return true;
        }
        return 'Last name must be at least 3 characters';
    };

    const goNext = (): boolean => {
        // eslint-disable-next-line no-console
        console.log('clicked');
        return true;
    };

    return (
        <AccountDetailsScreenBase
            WorkflowCardHeaderProps={{ title: 'Account Details' }}
            WorkflowCardInstructionProps={{ instructions: 'Enter your details below to complete account creation.' }}
            firstNameLabel="First Name"
            firstNameValidator={firstNameValidator}
            lastNameLabel="Last Name"
            lastNameValidator={lastNameValidator}
            WorkflowCardActionsProps={{
                canGoPrevious: true,
                showPrevious: true,
                previousLabel: 'Back',
                onPrevious: (): void => navigate('/login'),
                canGoNext: true,
                showNext: true,
                nextLabel: 'Next',
                onNext: goNext,
                totalSteps: 5,
                currentStep: 2,
            }}
        />
    );
};
