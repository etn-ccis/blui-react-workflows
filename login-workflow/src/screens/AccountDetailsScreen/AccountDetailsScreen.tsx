import React, { useCallback, useState } from 'react';
import { AccountDetailsScreenBase, AccountDetailsScreenProps } from '../AccountDetailsScreen';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { useTranslation } from 'react-i18next';

/**
 * Component renders a screen with account details information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param {AccountDetailsScreenProps} props - props of accountDetailsScreen
 *
 * @category Component
 */

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = (props) => {
    const { t } = useTranslation();
    const { actions } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens } = regWorkflow;
    const [firstName, setFirstName] = useState(screenData.AccountDetails.firstName);
    const [lastName, setLastName] = useState(screenData.AccountDetails.lastName);
    const [isLoading, setIsLoading] = useState(false);
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const onNext = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions?.setAccountDetails?.({ firstName, lastName });
            void nextScreen({
                screenId: 'AccountDetails',
                values: { firstName, lastName },
            });
        } catch (_error) {
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [actions, firstName, lastName, nextScreen, triggerError]);

    const onPrevious = useCallback(() => {
        previousScreen({
            screenId: 'AccountDetails',
            values: { firstName, lastName },
        });
    }, [firstName, lastName, previousScreen]);

    const {
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        WorkflowCardBaseProps,
        firstNameLabel = t('bluiCommon:FORMS.FIRST_NAME'),
        lastNameLabel = t('bluiCommon:FORMS.LAST_NAME'),
        firstNameValidator = (name: string): boolean | string => {
            if (name?.length > 0) {
                return true;
            }
            return t('bluiCommon:FORMS.FIRST_NAME_LENGTH_ERROR');
        },
        lastNameValidator = (name: string): boolean | string => {
            if (name?.length > 0) {
                return true;
            }
            return t('bluiCommon:FORMS.LAST_NAME_LENGTH_ERROR');
        },
        firstNameTextFieldProps,
        lastNameTextFieldProps,
        initialFirstName = screenData.AccountDetails.firstName,
        initialLastName = screenData.AccountDetails.lastName,
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: t('bluiRegistration:REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS'),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardActionsProps = {
        canGoNext: true,
        showNext: true,
        showPrevious: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        totalSteps: totalScreens,
        currentStep: currentScreen,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void onNext();
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            void onPrevious();
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    const onFirstNameInputChange = (e: any): void => {
        setFirstName(e.target.value);
    };
    const onLastNameInputChange = (e: any): void => {
        setLastName(e.target.value);
    };

    return (
        <AccountDetailsScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            initialFirstName={firstName.length > 0 ? firstName : initialFirstName}
            initialLastName={lastName.length > 0 ? lastName : initialLastName}
            firstNameLabel={firstNameLabel}
            firstNameTextFieldProps={{ ...firstNameTextFieldProps, onChange: onFirstNameInputChange }}
            firstNameValidator={firstNameValidator}
            lastNameLabel={lastNameLabel}
            lastNameTextFieldProps={{ ...lastNameTextFieldProps, onChange: onLastNameInputChange }}
            lastNameValidator={lastNameValidator}
            WorkflowCardActionsProps={workflowCardActionsProps}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
