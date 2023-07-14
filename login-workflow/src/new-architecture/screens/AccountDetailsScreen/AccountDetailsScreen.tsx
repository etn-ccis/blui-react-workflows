import React, { useCallback, useState } from 'react';
import { AccountDetailsScreenBase, AccountDetailsScreenProps } from '../AccountDetailsScreen';
import { useLanguageLocale } from '../../hooks';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';
import { AuthError } from '../../components/Error';
import { useErrorContext } from '../../contexts/ErrorContext';

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const errorConfig = useErrorContext();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens, updateScreenData } = regWorkflow;
    const [firstName, setFirstName] = useState(screenData.AccountDetails.firstName ?? '');
    const [lastName, setLastName] = useState(screenData.AccountDetails.lastName ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AuthError>({ cause: { title: '', errorMessage: '' } });

    const onNext = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions().setAccountDetails({ firstName, lastName });
            if (currentScreen === totalScreens - 2) {
                const { email, organizationName } = await actions().completeRegistration(
                    { firstName, lastName },
                    screenData.VerifyCode.code,
                    screenData.CreateAccount.emailAddress
                );
                updateScreenData({ screenId: 'RegistrationSuccessScreen', values: { email, organizationName } });
            }
            nextScreen({
                screenId: 'AccountDetails',
                values: { firstName, lastName },
            });
        } catch (_error) {
            setError({
                cause: {
                    title: (_error as AuthError).cause.title,
                    errorMessage: (_error as AuthError).cause.errorMessage,
                },
            });
        } finally {
            setIsLoading(false);
        }
    }, [
        firstName,
        lastName,
        actions,
        nextScreen,
        setIsLoading,
        screenData.VerifyCode.code,
        screenData.CreateAccount.emailAddress,
        totalScreens,
        currentScreen,
        updateScreenData,
    ]);

    const onPrevious = useCallback(() => {
        setFirstName(firstName);
        setLastName(lastName);
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
        errorDisplayConfig = errorConfig,
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
            errorDisplayConfig={{
                ...errorDisplayConfig,
                title: error.cause.title,
                errorMessage: error.cause.errorMessage,
                onClose: (): void => {
                    setError({ cause: { title: '', errorMessage: '' } });
                },
            }}
        />
    );
};
