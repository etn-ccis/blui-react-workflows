import React, { useCallback, useEffect, useRef, useState } from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { ResetPasswordScreenBase } from './ResetPasswordScreenBase';
import { useLanguageLocale } from '../../hooks';
import { useAuthContext } from '../../contexts';
import { defaultPasswordRequirements } from '../../constants';
import { useQueryString } from '../../../hooks/useQueryString';
import { ResetPasswordScreenProps } from './types';
import { SimpleDialog } from '../../../components';

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
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(props.showSuccessScreen);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const { code, email } = useQueryString();

    const { actions, navigate, routeConfig } = useAuthContext();
    const passwordRequirements = defaultPasswordRequirements(t);

    const handleOnNext = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions().setPassword(code, passwordInput, email);
            setIsLoading(false);
            setShowSuccessScreen(true);
        } catch (e) {
            setShowErrorDialog(true);
        }
    }, [setIsLoading, setShowSuccessScreen, actions, code, passwordInput, email]);

    const {
        PasswordProps: passwordProps = {
            newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
            confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
            passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
            passwordRequirements: passwordRequirements,
            passwordRef,
            confirmRef,
        },
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
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
            try {
                setIsLoading(true);
                navigate(routeConfig.LOGIN);
                WorkflowCardActionsProps?.onPrevious?.();
                setIsLoading(false);
            } catch (e) {
                setShowErrorDialog(true);
            }
        },
    };

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
        setPasswordInput(areValidMatchingPasswords() ? passwordInput : '');
    }, [setPasswordInput, passwordInput, confirmInput, areValidMatchingPasswords]);

    const errorDialog = (
        <SimpleDialog
            title={t('bluiCommon:MESSAGES.ERROR')}
            body={t('bluiAuth:FORGOT_PASSWORD.ERROR')}
            open={showErrorDialog}
            onClose={(): void => {
                setShowErrorDialog(false);
            }}
        />
    );

    return (
        <>
            {showErrorDialog ? (
                errorDialog
            ) : (
                <ResetPasswordScreenBase
                    WorkflowCardBaseProps={workflowCardBaseProps}
                    WorkflowCardHeaderProps={workflowCardHeaderProps}
                    WorkflowCardInstructionProps={workflowCardInstructionProps}
                    WorkflowCardActionsProps={workflowCardActionsProps}
                    PasswordProps={{
                        ...passwordProps,
                        onPasswordChange: updateFields,
                    }}
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
                />
            )}
        </>
    );
};
