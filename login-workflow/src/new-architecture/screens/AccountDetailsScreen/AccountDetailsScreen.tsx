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
    const [firstName, setFirstName] = useState(screenData.AccountDetails.firstName ?? '');
    const [lastName, setLastName] = useState(screenData.AccountDetails.lastName ?? '');

    const {
        title = t('bluiRegistration:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
        instructions = t('bluiRegistration:REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS'),
        firstNameLabel = t('bluiCommon:FORMS.FIRST_NAME'),
        /* eslint-disable @typescript-eslint/no-unused-vars */
        initialFirstName,
        initialLastName,
        lastNameLabel = t('bluiCommon:FORMS.LAST_NAME'),
        firstNameTextFieldProps,
        lastNameTextFieldProps,
        firstNameValidator = (name: string): boolean | string => {
            if (name?.length > 2) {
                setFirstName(name);
                return true;
            }
            return t('bluiCommon:FORMS.FIRST_NAME_LENGTH_ERROR');
        },
        lastNameValidator = (name: string): boolean | string => {
            if (name?.length > 2) {
                setLastName(name);
                return true;
            }
            return t('bluiCommon:FORMS.LAST_NAME_LENGTH_ERROR');
        },
        sx,
    } = props;

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
                currentStep: 1,
            }}
        />
    );
};
