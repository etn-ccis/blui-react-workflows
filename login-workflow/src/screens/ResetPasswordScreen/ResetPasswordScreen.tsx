import React, { useCallback, useRef, useState, useEffect } from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { ResetPasswordScreenBase } from './ResetPasswordScreenBase';
import { useAuthContext } from '../../contexts';
import { defaultPasswordRequirements } from '../../constants';
import { parseQueryString } from '../../utils';
import { ResetPasswordScreenProps } from './types';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { useTranslation } from 'react-i18next';

/**
 * Component that renders a ResetPassword screen that allows a user to reset their password and shows a success message upon a successful password reset..
 *
 * @param {ResetPasswordScreenProps} props - props of ResetPasswordScreen
 * @returns a React JSX Element that renders a ResetPassword screen
 *
 * @category Component
 *
 */

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = (props) => {
    const { t } = useTranslation();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const {
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        PasswordProps,
        slots = {},
        slotProps = {},
        ...otherProps
    } = props;

    const [passwordInput, setPasswordInput] = useState(PasswordProps?.initialNewPasswordValue ?? '');
    const [confirmInput, setConfirmInput] = useState(PasswordProps?.initialConfirmPasswordValue ?? '');
    const [hasVerifyCodeError, setHasVerifyCodeError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    const { code, email } = parseQueryString(window.location.search);

    const { actions, navigate, routeConfig } = useAuthContext();
    const passwordReqs = PasswordProps?.passwordRequirements ?? defaultPasswordRequirements(t);

    const verifyResetCode = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions.verifyResetCode(code, email);
        } catch (_error) {
            setHasVerifyCodeError(true);
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnNext = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions.setPassword(code, passwordInput, email);
            if (props.showSuccessScreen === false) {
                navigate(routeConfig.LOGIN as string);
            } else {
                setShowSuccessScreen(true);
            }
        } catch (_error) {
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [actions, code, passwordInput, email, triggerError, props.showSuccessScreen, navigate, routeConfig]);

    const areValidMatchingPasswords = useCallback((): boolean => {
        if (passwordReqs?.length === 0) {
            return confirmInput === passwordInput;
        }
        for (let i = 0; i < passwordReqs.length; i++) {
            if (!new RegExp(passwordReqs[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordReqs, passwordInput, confirmInput]);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    useEffect(() => {
        // eslint-disable-next-line
        verifyResetCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiCommon:FORMS.RESET_PASSWORD'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO'),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        showPrevious: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoNext: passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords(),
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void handleOnNext();
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            navigate(routeConfig.LOGIN as string);
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    const passwordProps = {
        newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
        confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
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
                void handleOnNext();
                WorkflowCardActionsProps?.onNext?.();
                PasswordProps?.onSubmit?.();
            }
        },
    };

    return (
        <ResetPasswordScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            PasswordProps={passwordProps}
            showSuccessScreen={showSuccessScreen}
            slots={slots}
            slotProps={{
                SuccessScreen: {
                    EmptyStateProps: {
                        icon: <CheckCircle color="primary" sx={{ fontSize: 100 }} />,
                        title: t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE'),
                        description: t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE'),
                    },
                    WorkflowCardActionsProps: {
                        showPrevious: false,
                        fullWidthButton: true,
                        showNext: true,
                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                        onNext: (): void => {
                            navigate(routeConfig.LOGIN as string);
                        },
                    },
                    ...slotProps.SuccessScreen,
                },
            }}
            {...otherProps}
            errorDisplayConfig={{
                ...errorDisplayConfig,
                onClose: hasVerifyCodeError
                    ? (): void => {
                          navigate(routeConfig.LOGIN as string);
                          // eslint-disable-next-line no-unused-expressions
                          errorDisplayConfig.onClose;
                      }
                    : errorDisplayConfig.onClose,
            }}
        />
    );
};
