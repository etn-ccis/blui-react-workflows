import React, { useCallback ,useState } from 'react';
import { CreateAccountScreenProps } from './types';
import { CreateAccountScreenBase } from './CreateAccountScreenBase';
import { useLanguageLocale } from '../../hooks';
import { useRegistrationContext } from '../../contexts/RegistrationContext/context';
import { useRegistrationWorkflowContext } from '../../contexts';

type CreateAccountFullScreenProps = CreateAccountScreenProps & {
    title?: string;
    instructions?: string;
};

/**
 * Component that renders a screen for the user to enter their email address to start the
 * account creation process.
 *
 * @param title title of workflow card
 * @param instructions create account content instructions
 * @param emailLabel label for the textfield
 * @param initialValue used to pre-populate the email input field
 * @param emailValidator used to test the input for valid formatting
 * @param emailTextFieldProps props to pass to the email text field
 *
 * @category Component
 */

export const CreateAccountScreen: React.FC<CreateAccountFullScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { navigate, routeConfig, language } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData } = regWorkflow;
    const {
        title = t('bluiRegistration:REGISTRATION.STEPS.CREATE_ACCOUNT'),
        instructions = t('blui:SELF_REGISTRATION.INSTRUCTIONS'),
        emailLabel = t('bluiRegistration:LABELS.EMAIL'),
        initialValue = '',
        emailValidator = (email: string): boolean | string => true,
        emailTextFieldProps,
    } = props;

    const [emailInput, setEmailInput] = React.useState(initialValue ? initialValue : '');
    const [isEmailValid, setIsEmailValid] = React.useState(emailValidator(initialValue) ?? false);
    const [emailError, setEmailError] = React.useState('');
    const [shouldValidateEmail, setShouldValidateEmail] = React.useState(false);

    const onNext = (): void => {
        try {
            setEmailInput(emailInput);
            nextScreen({
                screenId: 'CreateAccount',
                values: { isEmailValid: isEmailValid },
            });
        } catch {
            console.error('Error while updating create account...');
        }
    };

    const onPrevious = (): void => {
        try {
            setEmailInput(emailInput);
            previousScreen({
                screenId: 'CreateAccount',
                values: { isEmailValid: isEmailValid },
            });
        } catch {
            console.error('Error while updating create account...');
        }
    };
    
    const handleEmailInputChange = useCallback(
        (email: string) => {
            setEmailInput(email);
            const emailValidatorResponse = emailValidator(email);

            setIsEmailValid(typeof emailValidatorResponse === 'boolean' ? emailValidatorResponse : false);
            setEmailError(typeof emailValidatorResponse === 'string' ? emailValidatorResponse : '');
        },
        [emailValidator]
    );
    return (
        <CreateAccountScreenBase 
        WorkflowCardHeaderProps={{ title: title}}
        WorkflowCardInstructionProps={{instructions: instructions}}
        emailLabel={emailLabel}
        emailTextFieldProps={emailTextFieldProps}
        WorkflowCardActionsProps={{
            showNext: true,
            nextLabel: t('bluiCommon:ACTIONS.NEXT'),
            canGoNext: true,
            showPrevious: true,
            previousLabel: t('bluiCommon:ACTIONS.BACK'),
            canGoPrevious: true,
            currentStep: 1,
            totalSteps: 6,
            onNext: (): void => {
                void onNext();
                navigate(routeConfig.LOGIN)
            },
            onPrevious: (): void => {
                void onPrevious();
                navigate(routeConfig.LOGIN);
            },
        }}
        />
    );
};