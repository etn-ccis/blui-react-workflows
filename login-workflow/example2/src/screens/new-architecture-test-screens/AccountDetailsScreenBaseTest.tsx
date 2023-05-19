import React from 'react';
import { AccountDetailsScreenBase, AccountDetailsScreenProps } from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router';

export const AccountDetailsScreenBaseTest: React.FC<AccountDetailsScreenProps> = () => {
    const navigate = useNavigate();

    const nameValidator = (name: string): boolean => {
        if (name.length < 3) {
            return true;
        }
        return false;
    };

    return (
        <AccountDetailsScreenBase
            title="Account Details!"
            instructions="Enter your details below to complete account creation."
            firstNameLabel="First Name"
            lastNameLabel="Last Name"
            canGoPrevious={true}
            showPrevious={true}
            previousLabel="Back"
            onPrevious={(): void => navigate('/login')}
            canGoNext={false}
            showNext={true}
            nextLabel="Next"
            onNext={(): void => {}}
            totalSteps={5}
            currentStep={2}
            firstNameValidator={nameValidator}
            lastNameValidator={nameValidator}
        />
    );
};
