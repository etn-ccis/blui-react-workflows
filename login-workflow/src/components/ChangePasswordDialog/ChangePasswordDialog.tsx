import React, { useCallback, useRef, useState } from 'react';
import { defaultPasswordRequirements } from '../../constants';
import { useAuthContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { ChangePasswordDialogBase } from './ChangePasswordDialogBase';
import { ChangePasswordDialogProps } from './types';
import CheckCircle from '@mui/icons-material/CheckCircle';

/**
 * Component that renders a dialog with textField to enter current password and a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param dialogTitle title to display in the dialog
 * @param dialogDescription description to display in the dialog
 * @param currentPasswordLabel label to display for the current password field
 * @param previousLabel label to display for the previous button
 * @param nextLabel label to display for the next button
 * @param currentPasswordChange called when the current password field changes
 * @param enableButton boolean to enable and disable the button
 * @param onFinish function called when the button is clicked on success screen
 * @param onSubmit Callback function to call when the form is submitted
 * @param onPrevious function called when the previous button is clicked
 * @param showSuccessScreen boolean that determines whether to show the success screen or not
 * @param slots used for ChangePasswordDialog SuccessScreen props
 * @param slotProps props that will be passed to the SuccessScreen component
 *
 * @category Component
 */

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = (props) => {
    const { t } = useLanguageLocale();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [currentInput, setCurrentInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(props.showSuccessScreen);
    const { actions } = useAuthContext();

    const {
        open,
        dialogTitle = t('bluiAuth:CHANGE_PASSWORD.PASSWORD'),
        dialogDescription = t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO'),
        currentPasswordLabel = t('bluiCommon:LABELS.CURRENT_PASSWORD'),
        previousLabel = t('bluiCommon:ACTIONS.BACK'),
        nextLabel = t('bluiCommon:ACTIONS.OKAY'),
        onPrevious,
        onSubmit,
        onFinish,
        PasswordProps,
        ErrorDialogProps,
    } = props;

    const passwordRequirements = defaultPasswordRequirements(t);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    const checkPasswords =
        currentInput !== '' && passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput;

    const changePasswordSubmit = useCallback(async () => {
        if (checkPasswords) {
            try {
                setIsLoading(true);
                await actions.changePassword(currentInput, passwordInput);
                setShowSuccessScreen(true);
            } catch {
                setShowErrorDialog(true);
            } finally {
                setIsLoading(false);
            }
        }
    }, [checkPasswords, currentInput, passwordInput, actions, setIsLoading, setShowErrorDialog, onSubmit]);

    const passwordProps = {
        newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
        confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
        passwordRef,
        confirmRef,
        initialNewPasswordValue: passwordInput,
        initialConfirmPasswordValue: confirmInput,
        passwordRequirements,
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
            currentPasswordChange={(currentPwd): void => setCurrentInput(currentPwd)}
            enableButton={checkPasswords}
            onPrevious={onPrevious}
            onSubmit={async (): Promise<void> => {
                await changePasswordSubmit();
            }}
            PasswordProps={passwordProps}
            ErrorDialogProps={errorDialogProps}
            slotProps={{
                SuccessScreen: {
                    icon: <CheckCircle color="primary" sx={{ fontSize: 100 }} />,
                    messageTitle: t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE'),
                    message: t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE'),
                    onDismiss: (): void => {
                        onFinish();
                    },
                    WorkflowCardActionsProps: {
                        showPrevious: false,
                        fullWidthButton: true,
                        showNext: true,
                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                        onNext: (): void => {
                            onFinish();
                        },
                    },
                },
            }}
            showSuccessScreen={showSuccessScreen}
        />
    );
};
