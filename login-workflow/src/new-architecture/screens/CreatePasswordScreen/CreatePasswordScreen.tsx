import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CreatePasswordScreenBase } from './CreatePasswordScreenBase';
import { useLanguageLocale } from '../../hooks';
import { defaultPasswordRequirements } from '../../constants';
import { CreatePasswordScreenProps } from './types';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';

export const CreatePasswordScreen: React.FC<CreatePasswordScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const {
        nextScreen,
        previousScreen,
        screenData: {
            CreatePassword: { password, confirmPassword },
        },
    } = regWorkflow;
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [passwordInput, setPasswordInput] = useState(password ?? '');
    const [confirmInput, setConfirmInput] = useState(confirmPassword ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const passwordRequirements = defaultPasswordRequirements(t);

    const onNext = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions().createPassword(passwordInput);
            nextScreen({
                screenId: 'CreatePassword',
                values: { password: passwordInput, confirmPassword: confirmInput },
            });
        } catch {
            console.error('Error while creating password...');
        }
        setIsLoading(false);
    }, [passwordInput, confirmInput, actions, nextScreen, setIsLoading]);

    const onPrevious = useCallback(() => {
        previousScreen({
            screenId: 'CreatePassword',
            values: { password: passwordInput, confirmPassword: confirmInput },
        });
    }, [confirmInput, passwordInput, previousScreen]);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordRequirements, passwordInput, confirmInput]);

    const {
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        PasswordProps: passwordProps = {
            initialNewPasswordValue: passwordInput,
            initialConfirmPasswordValue: confirmInput,
            newPasswordLabel: t('bluiCommon:FORMS.PASSWORD'),
            confirmPasswordLabel: t('bluiCommon:FORMS.CONFIRM_PASSWORD'),
            passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
            passwordRequirements: passwordRequirements,
            passwordRef,
            confirmRef,
            onPasswordChange: updateFields,
            onSubmit: (): void => {
                if (areValidMatchingPasswords()) {
                    void onNext();
                    WorkflowCardActionsProps?.onNext?.();
                }
            },
        },
    } = props;

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.PASSWORD'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: t('bluiRegistration:REGISTRATION.INSTRUCTIONS.PASSWORD_INFO'),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        canGoNext: passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput,
        showPrevious: true,
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoPrevious: true,
        currentStep: 2,
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

    useEffect(() => {
        setPasswordInput(areValidMatchingPasswords() ? passwordInput : '');
    }, [setPasswordInput, passwordInput, confirmInput, areValidMatchingPasswords]);

    return (
        <>
            <CreatePasswordScreenBase
                WorkflowCardActionsProps={workflowCardActionsProps}
                WorkflowCardBaseProps={workflowCardBaseProps}
                WorkflowCardHeaderProps={workflowCardHeaderProps}
                WorkflowCardInstructionProps={workflowCardInstructionProps}
                PasswordProps={{
                    ...passwordProps,
                    onPasswordChange: updateFields,
                }}
            />
        </>
    );
};
