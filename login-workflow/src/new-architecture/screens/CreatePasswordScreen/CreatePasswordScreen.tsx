import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CreatePasswordScreenBase } from './CreatePasswordScreenBase';
import { useLanguageLocale } from '../../hooks';
import { defaultPasswordRequirements } from '../../constants';
import { CreatePasswordScreenProps } from './types';
import { useRegistrationWorkflowContext } from '../../contexts';

export const CreatePasswordScreen: React.FC<CreatePasswordScreenProps> = (props) => {
    const { t } = useLanguageLocale();
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
    const passwordRequirements = defaultPasswordRequirements(t);

    const onNext = useCallback(() => {
        nextScreen({
            screenId: 'CreatePassword',
            values: { password: passwordInput, confirmPassword: confirmInput },
        });
    }, [confirmInput, passwordInput, nextScreen]);

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

    const {
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
                console.error('submitting form...');
            },
        },
        WorkflowCardHeaderProps: workflowCardHeaderProps = {
            title: t('bluiRegistration:REGISTRATION.STEPS.PASSWORD'),
        },
        WorkflowCardInstructionProps: workflowCardInstructionProps = {
            instructions: t('bluiRegistration:REGISTRATION.INSTRUCTIONS.PASSWORD_INFO'),
        },
        WorkflowCardActionsProps: workflowCardActionsProps = {
            showNext: true,
            nextLabel: t('bluiCommon:ACTIONS.NEXT'),
            canGoNext: passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput,
            showPrevious: true,
            previousLabel: t('bluiCommon:ACTIONS.BACK'),
            canGoPrevious: true,
            currentStep: 3,
            totalSteps: 6,
            onNext: (): void => {
                void onNext();
            },
            onPrevious: (): void => {
                void onPrevious();
            },
        },
    } = props;

    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordRequirements, passwordInput, confirmInput]);

    useEffect(() => {
        setPasswordInput(areValidMatchingPasswords() ? passwordInput : '');
    }, [setPasswordInput, passwordInput, confirmInput, areValidMatchingPasswords]);

    return (
        <>
            <CreatePasswordScreenBase
                WorkflowCardHeaderProps={workflowCardHeaderProps}
                WorkflowCardInstructionProps={workflowCardInstructionProps}
                WorkflowCardActionsProps={workflowCardActionsProps}
                PasswordProps={{
                    ...passwordProps,
                    onPasswordChange: updateFields,
                }}
            />
        </>
    );
};
