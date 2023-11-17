import React from 'react';
import { CreateNewOrgScreenBase } from '@brightlayer-ui/react-auth-workflow';

export const CreateNewOrgScreenBaseDemo: React.FC = () => (
    <CreateNewOrgScreenBase
        WorkflowCardHeaderProps={{ title: 'Create An Organization' }}
        WorkflowCardInstructionProps={{
            instructions:
                'Enter your organization name to continue with account creation.',
        }}
        orgNameLabel="Organization Name"
        orgNameValidator={(orgName: string): boolean | string => {
            if (orgName?.length > 0) {
                return true;
            }
            return 'Please enter a valid organization name';
        }}
        WorkflowCardActionsProps={{
            onNext: (): void => {},
            showNext: true,
            nextLabel: 'Next',
            onPrevious: (): void => {},
            showPrevious: true,
            previousLabel: 'Back',
            canGoNext: true,
            currentStep: 0,
            totalSteps: 2,
        }}
    />
);
