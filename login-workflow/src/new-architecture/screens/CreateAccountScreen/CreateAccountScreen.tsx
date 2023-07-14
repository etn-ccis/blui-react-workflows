import React, { useCallback, useState } from 'react';
import { CreateAccountScreenProps } from './types';
import { CreateAccountScreenBase } from './CreateAccountScreenBase';
import { useLanguageLocale } from '../../hooks';
import { useRegistrationContext } from '../../contexts/RegistrationContext/context';
import { useRegistrationWorkflowContext } from '../../contexts';

/**
 * Component that renders a screen for the user to enter their email address to start the
 * account creation process.
 *
 * @param emailLabel label for the textfield
 * @param initialValue used to pre-populate the email input field
 * @param emailValidator used to test the input for valid formatting
 * @param emailTextFieldProps props to pass to the email text field
 *
 * @category Component
 */
const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData } = regWorkflow;
    const [emailInputValue, setEmailInputValue] = useState(screenData.CreateAccount.emailAddress);
    const [isLoading, setIsLoading] = useState(false);

    const onNext = useCallback(async () => {
        try {
            setIsLoading(true);
            await actions().requestRegistrationCode(emailInputValue);
            nextScreen({
                screenId: 'CreateAccount',
                values: { emailAddress: emailInputValue },
            });
        } catch {
            console.error('Error while updating create account!');
        }
        setIsLoading(false);
    }, [emailInputValue, nextScreen, actions]);

    const onPrevious = (): void => {
        previousScreen({
            screenId: 'CreateAccount',
            values: { emailAddress: emailInputValue },
        });
    };
    const {
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        emailLabel = t('bluiCommon:LABELS.EMAIL'),
        initialValue = screenData.CreateAccount.emailAddress,
        emailValidator = (email: string): boolean | string => {
            if (!EMAIL_REGEX.test(email)) {
                return t('bluiCommon:MESSAGES.EMAIL_ENTRY_ERROR');
            }
            return true;
        },
        emailTextFieldProps,
    } = props;

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.CREATE_ACCOUNT'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: t('bluiRegistration:SELF_REGISTRATION.INSTRUCTIONS'),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        showPrevious: true,
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoPrevious: true,
        currentStep: 1,
        totalSteps: 6,
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

    const onEmailInputValueChange = (e: any): void => {
        setEmailInputValue(e.target.value);
    };

    return (
        <CreateAccountScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            emailLabel={emailLabel}
            initialValue={initialValue}
            emailTextFieldProps={{ ...emailTextFieldProps, onChange: onEmailInputValueChange }}
            emailValidator={emailValidator}
            WorkflowCardActionsProps={workflowCardActionsProps}
        />
    );
};
