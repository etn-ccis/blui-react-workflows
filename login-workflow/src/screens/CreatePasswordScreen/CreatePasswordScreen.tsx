import React, { useCallback, useRef, useState } from 'react';
import { CreatePasswordScreenBase } from './CreatePasswordScreenBase';
import { defaultPasswordRequirements } from '../../constants';
import { CreatePasswordScreenProps } from './types';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { useTranslation } from 'react-i18next';

/**
 * The component renders a screen with the password and confirm password field for creating a new password.
 *
 * @param {CreatePasswordScreenProps} props - props of CreatePasswordScreen
 *
 * @category Component
 */

export const CreatePasswordScreen: React.FC<CreatePasswordScreenProps> = (props) => {
    const { t } = useTranslation();
    const { actions } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const {
        nextScreen,
        previousScreen,
        screenData: {
            CreatePassword: { password, confirmPassword },
        },
        currentScreen,
        totalScreens,
    } = regWorkflow;

    const {
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        PasswordProps,
    } = props;

    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [passwordInput, setPasswordInput] = useState(
        password !== '' ? password : PasswordProps?.initialNewPasswordValue ?? ''
    );
    const [confirmInput, setConfirmInput] = useState(
        confirmPassword !== '' ? confirmPassword : PasswordProps?.initialConfirmPasswordValue ?? ''
    );
    const [isLoading, setIsLoading] = useState(false);
    const passwordReqs = PasswordProps?.passwordRequirements ?? defaultPasswordRequirements(t);
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
            await actions?.createPassword?.(passwordInput);
            void nextScreen({
                screenId: 'CreatePassword',
                values: { password: passwordInput, confirmPassword: confirmInput },
            });
        } catch (_error) {
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [actions, passwordInput, nextScreen, confirmInput, triggerError]);

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
        if (passwordReqs?.length === 0) {
            return confirmInput === passwordInput;
        }
        for (let i = 0; i < passwordReqs.length; i++) {
            if (!new RegExp(passwordReqs[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordReqs, passwordInput, confirmInput]);

    const passwordProps = {
        newPasswordLabel: t('bluiCommon:FORMS.PASSWORD'),
        confirmPasswordLabel: t('bluiCommon:FORMS.CONFIRM_PASSWORD'),
        passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
        passwordRequirements: passwordReqs,
        passwordRef,
        confirmRef,
        ...PasswordProps,
        initialNewPasswordValue: passwordInput,
        initialConfirmPasswordValue: confirmInput,
        onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
            updateFields(passwordData);
            PasswordProps?.onPasswordChange?.(passwordData);
        },
        onSubmit: (): void => {
            if (areValidMatchingPasswords()) {
                void onNext();
                WorkflowCardActionsProps?.onNext?.();
                PasswordProps?.onSubmit?.();
            }
        },
    };

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
        canGoNext: passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords(),
        showPrevious: true,
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoPrevious: true,
        currentStep: currentScreen,
        totalSteps: totalScreens,
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
        <CreatePasswordScreenBase
            WorkflowCardActionsProps={workflowCardActionsProps}
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            PasswordProps={passwordProps}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
