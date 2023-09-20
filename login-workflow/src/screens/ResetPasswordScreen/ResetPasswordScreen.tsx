import React, { useCallback, useRef, useState, useEffect } from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { ResetPasswordScreenBase } from './ResetPasswordScreenBase';
import { useLanguageLocale } from '../../hooks';
import { useAuthContext } from '../../contexts';
import { defaultPasswordRequirements } from '../../constants';
import { parseQueryString } from '../../utils';
import { ResetPasswordScreenProps } from './types';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { SuccessScreenBase } from '../SuccessScreen';

/**
 * Component that renders a ResetPassword screen that allows a user to reset their password and shows a success message upon a successful password reset..
 *
 * @param PasswordProps props that will be passed to the SetPassword component
 * @param showSuccessScreen boolean that determines whether to show the success screen or not
 * @param slots used for ResetPasswordScreen SuccessScreen props
 * @param slotProps props that will be passed to the SuccessScreen component
 * @param errorDisplayConfig configuration for customizing how errors are displayed
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
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const { triggerError, errorManagerConfig } = useErrorManager();

    const { code, email } = parseQueryString(window.location.search);

    const { actions, navigate, routeConfig } = useAuthContext();
    const passwordRequirements = defaultPasswordRequirements(t);

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
                navigate(routeConfig.LOGIN);
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
        // eslint-disable-next-line
        verifyResetCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        PasswordProps,
        errorDisplayConfig = errorManagerConfig,
        slotProps = { SuccessScreen: {} },
        slots,
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
            showSuccessScreen={showSuccessScreen}
            slots={{
                SuccessScreen:
                    slots?.SuccessScreen ??
                    ((): JSX.Element => (
                        <SuccessScreenBase
                            icon={<CheckCircle color="primary" sx={{ fontSize: 100 }} />}
                            messageTitle={t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE')}
                            message={t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE')}
                            {...slotProps.SuccessScreen}
                            WorkflowCardActionsProps={{
                                showNext: true,
                                nextLabel: t('bluiCommon:ACTIONS.DONE'),
                                canGoNext: true,
                                fullWidthButton: true,
                                ...slotProps.SuccessScreen.WorkflowCardActionsProps,
                                onNext: (): void => {
                                    navigate(routeConfig.LOGIN);
                                    if (slotProps.SuccessScreen.WorkflowCardActionsProps)
                                        slotProps.SuccessScreen.WorkflowCardActionsProps?.onNext?.();
                                },
                            }}
                        />
                    )),
            }}
            errorDisplayConfig={{
                ...errorDisplayConfig,
                onClose: hasVerifyCodeError
                    ? (): void => {
                          // eslint-disable-next-line no-unused-expressions
                          navigate(routeConfig.LOGIN);
                          // eslint-disable-next-line
                          errorDisplayConfig.onClose;
                      }
                    : errorDisplayConfig.onClose,
            }}
        />
    );
};
