import React from 'react';
import { AccountDetailsScreenBase, AccountDetailsScreenProps } from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router';

export const AccountDetailsScreenBaseTest: React.FC<AccountDetailsScreenProps> = () => {
    const navigate = useNavigate();

    const nameValidator = (name: string): boolean | string => {
        if (name?.length > 2) {
            return true;
        }
        return 'Please enter a valid First Name';
    };

    const goNext = (): boolean => {
        // eslint-disable-next-line no-console
        console.log('clicked');
        return true;
    };

    return (
        <AccountDetailsScreenBase
            WorkflowCardHeaderProps={{ title: 'Account Details!' }}
            WorkflowCardInstructionProps={{ instructions: 'Enter your details below to complete account creation.' }}
            firstNameLabel="First Name"
            firstNameValidator={nameValidator}
            lastNameLabel="Last Name"
            lastNameValidator={nameValidator}
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
