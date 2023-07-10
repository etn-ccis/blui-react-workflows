import React, { useCallback, useState } from 'react';
import { AccountDetailsScreenBase, AccountDetailsScreenProps } from '../AccountDetailsScreen';
import { useLanguageLocale } from '../../hooks';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData } = regWorkflow;
    const [firstName, setFirstName] = useState(screenData.AccountDetails.firstName ?? '');
    const [lastName, setLastName] = useState(screenData.AccountDetails.lastName ?? '');
    const [isLoading, setIsLoading] = useState(false);

    const onNext = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions().setAccountDetails({ firstName, lastName });
            nextScreen({
                screenId: 'AccountDetails',
                values: { firstName, lastName },
            });
        } catch {
            console.error('Error while updating account details...');
        }
        setIsLoading(false);
    }, [firstName, lastName, actions, nextScreen, setIsLoading]);

    const onPrevious = useCallback(() => {
        setFirstName(firstName);
        setLastName(lastName);
        previousScreen({
            screenId: 'AccountDetails',
            values: { firstName, lastName },
        });
    }, [firstName, lastName, previousScreen]);

    const {
        WorkflowCardHeaderProps: workflowCardHeaderProps = {
            title: t('bluiRegistration:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
        },
        WorkflowCardInstructionProps: workflowCardInstructionProps = {
            instructions: t('bluiRegistration:REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS'),
        },
        WorkflowCardActionsProps,
        WorkflowCardBaseProps: workflowCardBaseProps = {
            loading: isLoading,
        },
        firstNameLabel = t('bluiCommon:FORMS.FIRST_NAME'),
        lastNameLabel = t('bluiCommon:FORMS.LAST_NAME'),
        firstNameValidator = (name: string): boolean | string => {
            setFirstName(name);
            if (name?.length > 2) {
                return true;
            }
            return t('bluiCommon:FORMS.FIRST_NAME_LENGTH_ERROR');
        },
        lastNameValidator = (name: string): boolean | string => {
            setLastName(name);
            if (name?.length > 2) {
                return true;
            }
            return t('bluiCommon:FORMS.LAST_NAME_LENGTH_ERROR');
        },
    } = props;

    const workflowCardActionsProps = {
        canGoNext: true,
        showNext: true,
        showPrevious: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        totalSteps: 6,
        currentStep: 4,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void onNext();
            WorkflowCardActionsProps?.onNext();
        },
        onPrevious: (): void => {
            void onPrevious();
            WorkflowCardActionsProps?.onPrevious();
        },
    };

    return (
        <AccountDetailsScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            initialFirstName={firstName}
            initialLastName={lastName}
            firstNameLabel={firstNameLabel}
            firstNameValidator={firstNameValidator}
            lastNameLabel={lastNameLabel}
            lastNameValidator={lastNameValidator}
            WorkflowCardActionsProps={workflowCardActionsProps}
        />
    );
};
