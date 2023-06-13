import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguageLocale } from '../../hooks';
import { defaultPasswordRequirements } from '../../constants';
import { CreatePasswordScreenBase } from './CreatePasswordScreenBase';
import { useRegistrationWorkflowContext } from '../../contexts';

export const CreatePasswordScreen = (): JSX.Element => {
    const { t } = useLanguageLocale();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData } = regWorkflow;
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [passwordInput, setPasswordInput] = useState(screenData.CreatePassword.password ?? '');
    const [confirmInput, setConfirmInput] = useState(screenData.CreatePassword.confirmPassword ?? '');

    const passwordRequirements = defaultPasswordRequirements(t, 'bluiRegistration');
    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordRequirements, passwordInput, confirmInput]);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

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

    useEffect(() => {
        setPasswordInput(areValidMatchingPasswords() ? passwordInput : '');
    }, [setPasswordInput, passwordInput, confirmInput, areValidMatchingPasswords]);

    return (
        <CreatePasswordScreenBase
            WorkflowCardHeaderProps={{ title: t('bluiRegistration:REGISTRATION.STEPS.PASSWORD') }}
            WorkflowCardInstructionProps={{
                instructions: t('bluiRegistration:REGISTRATION.CREATE_PASSWORD.PASSWORD_INFO'),
            }}
            PasswordProps={{
                passwordRef: passwordRef,
                confirmRef: confirmRef,
                initialNewPasswordValue: passwordInput,
                initialConfirmPasswordValue: confirmInput,
                newPasswordLabel: t('bluiRegistration:REGISTRATION.CREATE_PASSWORD.PASSWORD'),
                confirmPasswordLabel: t('bluiRegistration:REGISTRATION.CREATE_PASSWORD.CONFIRM_PASSWORD'),
                passwordNotMatchErrorMsg: t('bluiRegistration:REGISTRATION.CREATE_PASSWORD.PASS_MATCH_ERROR'),
                passwordRequirements: defaultPasswordRequirements(t, 'bluiRegistration'),
                onPasswordChange: updateFields,
                onSubmit: (): void => {
                    console.error('submitting form...');
                },
            }}
            WorkflowCardActionsProps={{
                showNext: true,
                nextLabel: 'Next',
                canGoNext: passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput,
                showPrevious: true,
                previousLabel: 'Back',
                canGoPrevious: true,
                currentStep: 2,
                totalSteps: 6,
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
