import React, { useState } from 'react';
import { AccountDetailsScreenBase, AccountDetailsScreenProps } from '../AccountDetailsScreen';
import { useLanguageLocale } from '../../hooks';
import { useRegistrationWorkflowContext } from '../../contexts';

type AccountDetailsFullScreenProps = AccountDetailsScreenProps & {
    title?: string;
    instructions?: string;
};

export const AccountDetailsScreen: React.FC<AccountDetailsFullScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData } = regWorkflow;

    const firstNameValidatorFn = (firstName: string): boolean | string => {
        if (firstName?.length > 4) {
            setFirstName(firstName)
            return true;
        }
        return 'First name must be at least 5 characters';
    };

    const lastNameValidatorFn = (lastName: string): boolean | string => {
        if (lastName?.length > 2) {
            setLastName(lastName)
            return true;
        }
        return 'Last name must be at least 3 characters';
    };

    const {
        title = t('bluiRegistration:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
        instructions = t('bluiRegistration:REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS'),
        firstNameLabel = t('bluiCommon:FORMS.FIRST_NAME'),
        initialFirstName = '',
        initialLastName = '',
        lastNameLabel = t('bluiCommon:FORMS.LAST_NAME'),
        firstNameTextFieldProps,
        lastNameTextFieldProps,
        firstNameValidator = firstNameValidatorFn,
        lastNameValidator = lastNameValidatorFn,
        sx,
    } = props;

   
    const [firstName, setFirstName] = useState(screenData.AccountDetails.firstName ?? initialFirstName);
    const [lastName, setLastName] = useState(screenData.AccountDetails.lastName ?? initialLastName);

    const onNext = (): void => {
        try {
            setFirstName(firstName);
            setLastName(lastName);
            nextScreen({
                screenId: 'AccountDetails',
                values: { firstName: firstName, lastName: lastName },
            });
        } catch {
            console.error('Error while updating account details...');
        }
    };

    const onPrevious = (): void => {
        try {
            setFirstName(firstName);
            setLastName(lastName);
            previousScreen({
                screenId: 'AccountDetails',
                values: { firstName: firstName, lastName: lastName },
            });
        } catch {
            console.error('Error while updating account details...');
        }
    };

    return (
        <AccountDetailsScreenBase
            WorkflowCardHeaderProps={{ title: title }}
            WorkflowCardInstructionProps={{ instructions: instructions }}
            initialFirstName={firstName}
            initialLastName={lastName}
            firstNameLabel={firstNameLabel}
            firstNameValidator={firstNameValidator}
            lastNameLabel={lastNameLabel}
            lastNameValidator={lastNameValidator}
            firstNameTextFieldProps={firstNameTextFieldProps}
            lastNameTextFieldProps={lastNameTextFieldProps}
            sx={sx}
            WorkflowCardActionsProps={{
                canGoPrevious: true,
                showPrevious: true,
                previousLabel: t('bluiCommon:ACTIONS.BACK'),
                onPrevious: onPrevious,
                canGoNext: true,
                showNext: true,
                nextLabel: t('bluiCommon:ACTIONS.NEXT'),
                onNext: onNext,
                totalSteps: 5,
                currentStep: 2,
            }}
        />
    );
};
