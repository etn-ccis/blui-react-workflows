import React, { useCallback, useRef, useState, useEffect } from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { ResetPasswordScreenBase } from './ResetPasswordScreenBase';
import { useLanguageLocale } from '../../hooks';
import { useAuthContext } from '../../contexts';
import { defaultPasswordRequirements } from '../../constants';
import { parseQueryString } from '../../utils';
import { ResetPasswordScreenProps } from './types';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';

/**
 * Component that renders a ResetPassword screen that allows a user to reset their password and shows a success message upon a successful password reset..
 *
 * @param showSuccessScreen boolean that determines whether to show the success screen or not
 * @param slotProps props that will be passed to the SuccessScreen component
 * @param PasswordProps props that will be passed to the SetPassword component
 * @param SuccessScreen component that will be rendered when showSuccessScreen is true
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 * @returns a React JSX Element that renders a ResetPassword screen
 *
 * @category Component
 *
 */

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [hasVerifyCodeError, setHasVerifyCodeError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(props.showSuccessScreen);
    const { triggerError, errorManagerConfig } = useErrorManager();

    const { code, email } = parseQueryString(window.location.search);

    const { actions, navigate, routeConfig } = useAuthContext();
    const passwordRequirements = defaultPasswordRequirements(t);

    const verifyResetCode = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions().verifyResetCode(code, email);
        } catch (_error) {
            setHasVerifyCodeError(true);
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleOnNext = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions().setPassword(code, passwordInput, email);
            setShowSuccessScreen(true);
        } catch (_error) {
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [actions, code, passwordInput, email, triggerError]);

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

    useEffect(() => {
        verifyResetCode();
    }, []);

    const {
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        PasswordProps,
        errorDisplayConfig = errorManagerConfig,
    } = props;

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
        canGoNext: passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void handleOnNext();
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            navigate(routeConfig.LOGIN);
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    const passwordProps = {
        newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
        confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
        passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
        passwordRequirements: passwordRequirements,
        passwordRef,
        confirmRef,
        ...PasswordProps,
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
            slotProps={{
                SuccessScreen: {
                    icon: <CheckCircle color="primary" sx={{ fontSize: 100 }} />,
                    messageTitle: t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE'),
                    message: t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE'),
                    onDismiss: (): void => {
                        navigate(routeConfig.LOGIN);
                    },
                    WorkflowCardActionsProps: {
                        showPrevious: false,
                        fullWidthButton: true,
                        showNext: true,
                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                        onNext: (): void => {
                            navigate(routeConfig.LOGIN);
                        },
                    },
                },
            }}
            showSuccessScreen={showSuccessScreen}
            errorDisplayConfig={{
                ...errorDisplayConfig,
                onClose: hasVerifyCodeError
                    ? (): void => {
                          navigate(routeConfig.LOGIN);
                          errorDisplayConfig.onClose;
                      }
                    : errorDisplayConfig.onClose,
            }}
        />
    );
};
