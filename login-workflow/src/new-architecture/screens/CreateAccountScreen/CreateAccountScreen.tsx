import React, { useState } from 'react';
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
    const {
        WorkflowCardHeaderProps: workflowCardHeaderProps = {
            title: t('bluiRegistration:REGISTRATION.STEPS.CREATE_ACCOUNT'),
        },
        WorkflowCardInstructionProps: workflowCardInstructionProps = {
            instructions: t('bluiRegistration:SELF_REGISTRATION.INSTRUCTIONS'),
        },
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
    const [emailInputValue, setEmailInputValue] = useState(screenData.CreateAccount.emailAddress);

    const onNext = async (): Promise<void> => {
        const success = await actions().requestRegistrationCode(emailInputValue);

        // eslint-disable-next-line no-console
        console.log('success: ', success);
        try {
            nextScreen({
                screenId: 'CreateAccount',
                values: { emailAddress: emailInputValue },
            });
            // eslint-disable-next-line no-console
            console.log('going to next screen... with screen data: ', screenData);
        } catch {
            console.error('Error while updating create account...');
        }
    };

    const onPrevious = (): void => {
        try {
            previousScreen({
                screenId: 'CreateAccount',
                values: { emailAddress: emailInputValue },
            });
            // eslint-disable-next-line no-console
            console.log('going to previous screen... with screen data: ', screenData);
        } catch {
            console.error('Error while updating create account...');
        }
    };

    const onEmailInputValueChange = (e: any): void => {
        setEmailInputValue(e.target.value);
    };

    return (
        <CreateAccountScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            emailLabel={emailLabel}
            initialValue={initialValue}
            emailTextFieldProps={{ ...emailTextFieldProps, onChange: onEmailInputValueChange }}
            emailValidator={emailValidator}
            WorkflowCardActionsProps={{
                showNext: true,
                nextLabel: t('bluiCommon:ACTIONS.NEXT'),
                canGoNext: true,
                showPrevious: true,
                previousLabel: t('bluiCommon:ACTIONS.BACK'),
                canGoPrevious: true,
                onNext: (): void => {
                    void onNext();
                },
                onPrevious: (): void => {
                    void onPrevious();
                },
            }}
        />
    );
};
