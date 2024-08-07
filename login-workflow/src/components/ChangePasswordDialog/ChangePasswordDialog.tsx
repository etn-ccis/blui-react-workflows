import React, { useCallback, useRef, useState } from 'react';
import { defaultPasswordRequirements } from '../../constants';
import { useAuthContext } from '../../contexts';
import { ChangePasswordDialogBase } from './ChangePasswordDialogBase';
import { ChangePasswordDialogProps } from './types';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';

/**
 * Component that renders a dialog with textField to enter current password and a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param {ChangePasswordDialogProps} props - props of changePassword dailog
 *
 * @category Component
 */

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = (props) => {
    const { t } = useTranslation();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const {
        open,
        dialogTitle = t('bluiAuth:CHANGE_PASSWORD.PASSWORD'),
        dialogDescription = t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO'),
        currentPasswordLabel = t('bluiCommon:LABELS.CURRENT_PASSWORD'),
        previousLabel = t('bluiCommon:ACTIONS.BACK'),
        nextLabel = t('bluiCommon:ACTIONS.OKAY'),
        onPrevious,
        onFinish,
        PasswordProps,
        ErrorDialogProps,
        loading,
        currentPasswordTextFieldProps,
        slots = {},
        slotProps = {},
    } = props;

    const [currentInput, setCurrentInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(loading);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const { actions, navigate, routeConfig } = useAuthContext();

    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };
    const [hasVerifyCodeError, setHasVerifyCodeError] = useState(false);

    const passwordReqs = PasswordProps?.passwordRequirements ?? defaultPasswordRequirements(t);

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

    const checkPasswords =
        currentInput !== '' && passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords();

    const changePasswordSubmit = useCallback(async () => {
        if (checkPasswords) {
            try {
                setIsLoading(true);
                await actions.changePassword(currentInput, passwordInput);
                if (props.showSuccessScreen === false) {
                    onFinish?.();
                }
                setShowSuccessScreen(true);
            } catch (_error) {
                setHasVerifyCodeError(true);
                // setShowErrorDialog(true);
                triggerError(_error as Error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [
        checkPasswords,
        currentInput,
        passwordInput,
        actions,
        setIsLoading,
        onFinish,
        props.showSuccessScreen,
        triggerError,
    ]);

    const passwordProps = {
        newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
        confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
        passwordRef,
        confirmRef,
        initialNewPasswordValue: passwordInput,
        initialConfirmPasswordValue: confirmInput,
        passwordRequirements: passwordReqs,
        passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
        ...PasswordProps,
        onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
            updateFields(passwordData);
            PasswordProps?.onPasswordChange?.(passwordData);
        },
        onSubmit: async (): Promise<void> => {
            await changePasswordSubmit();
            PasswordProps?.onSubmit?.();
        },
    };

    const errorDialogProps = {
        open: showErrorDialog,
        title: t('bluiCommon:MESSAGES.ERROR'),
        body: t('bluiAuth:CHANGE_PASSWORD.PROBLEM_OCCURRED'),
        dismissButtonText: t('bluiCommon:ACTIONS.OKAY'),
        ...ErrorDialogProps,
        onClose: (): void => setShowErrorDialog(false),
    };

    return (
        <ChangePasswordDialogBase
            open={open}
            loading={isLoading}
            dialogTitle={dialogTitle}
            dialogDescription={dialogDescription}
            currentPasswordLabel={currentPasswordLabel}
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            currentPasswordChange={(currentPwd): void => {
                setCurrentInput(currentPwd);
                props?.currentPasswordChange?.(currentPwd);
            }}
            enableButton={checkPasswords}
            onPrevious={onPrevious}
            PasswordProps={passwordProps}
            ErrorDialogProps={errorDialogProps}
            currentPasswordTextFieldProps={currentPasswordTextFieldProps}
            onSubmit={async (): Promise<void> => {
                await changePasswordSubmit();
            }}
            slots={slots}
            slotProps={{
                SuccessScreen: {
                    EmptyStateProps: {
                        icon: <CheckCircle color="primary" sx={{ fontSize: 100 }} />,
                        title: t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE'),
                        description: t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE'),
                    },
                    onDismiss: (): void => {
                        onFinish?.();
                    },
                    WorkflowCardActionsProps: {
                        showPrevious: false,
                        fullWidthButton: true,
                        showNext: true,
                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                        onNext: (): void => {
                            onFinish?.();
                        },
                    },
                    ...slotProps.SuccessScreen,
                },
            }}
            showSuccessScreen={showSuccessScreen}
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
