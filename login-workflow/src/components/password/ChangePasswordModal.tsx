import React, { useState, useCallback, ChangeEvent, useRef } from 'react';
import {
    useSecurityState,
    useSecurityActions,
    useLanguageLocale,
    useAccountUIActions,
    initialTransitState,
    transitSuccess,
    transitStart,
    transitFailed,
    useInjectedUIContext,
    AccountActions,
} from '@pxblue/react-auth-shared';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
    Grid,
    useTheme,
    Divider,
    useMediaQuery,
} from '@material-ui/core';
import { ChangePasswordForm } from './ChangePasswordForm';
import { SecureTextField } from '../SecureTextField';
import { SimpleDialog } from '../SimpleDialog';
import { FinishState } from '../FinishState';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { defaultPasswordRequirements } from '../../constants';
import { useDialogStyles } from '../../styles';
import clsx from 'clsx';

/**
 * Component that renders a change password form in a modal dialog. This dialog is automatically
 * shown and hidden based on the securityState context. It can be opened by calling
 * useSecurityActions().showChangePassword().
 *
 * @category Component
 */
export const ChangePasswordModal: React.FC = () => {
    const { t } = useLanguageLocale();
    const securityState = useSecurityState();
    const accountUIActions = useAccountUIActions();
    const securityHelper = useSecurityActions();
    const theme = useTheme();
    const sharedClasses = useDialogStyles();
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const [transitState, setTransitState] = useState(initialTransitState);
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const success = transitState.transitSuccess;

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPassword(fields.password);
            setConfirm(fields.confirm);
        },
        [setPassword, setConfirm]
    );

    const { passwordRequirements = defaultPasswordRequirements(t) } = useInjectedUIContext();

    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(password)) return false;
        }
        return confirm === password;
    }, [passwordRequirements, password, confirm]);

    const changePassword = useCallback(async (): Promise<void> => {
        try {
            setHasAcknowledgedError(false);
            setTransitState(transitStart());
            await accountUIActions.actions.changePassword(currentPassword, password);
            setTransitState(transitSuccess());
        } catch (error) {
            setTransitState(transitFailed(error.errorMessage));
        }
    }, [accountUIActions, currentPassword, password]);

    // Dynamically change the body content based on successful change
    let body: JSX.Element;
    if (success) {
        body = (
            <FinishState
                icon={<CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
                title={t('pxb:CHANGE_PASSWORD.PASSWORD_CHANGED')}
                description={t('pxb:CHANGE_PASSWORD.SUCCESS_MESSAGE')}
            />
        );
    } else {
        body = (
            <ChangePasswordForm
                passwordLabel={t('pxb:LABELS.NEW_PASSWORD')}
                onPasswordChange={updateFields}
                passwordRef={passwordRef}
                confirmRef={confirmRef}
                onSubmit={(): void => {
                    if (
                        transitState.transitInProgress ||
                        (!transitState.transitSuccess && (currentPassword === '' || !areValidMatchingPasswords()))
                    )
                        return;
                    void changePassword();
                }}
            >
                <SecureTextField
                    id="current-password"
                    label={t('pxb:LABELS.CURRENT_PASSWORD')}
                    value={currentPassword}
                    onChange={(evt: ChangeEvent<HTMLInputElement>): void => setCurrentPassword(evt.target.value)}
                    onKeyPress={(e): void => {
                        if (e.key === 'Enter' && passwordRef.current) {
                            passwordRef.current.focus();
                        }
                    }}
                />
            </ChangePasswordForm>
        );
    }

    const errorDialog = (
        <SimpleDialog
            title={t('pxb:MESSAGES.ERROR')}
            body={transitState.transitErrorMessage ?? ''}
            open={transitState.transitErrorMessage !== null && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    const resetForm = useCallback(() => {
        setTransitState(initialTransitState);
        setCurrentPassword('');
        setPassword('');
        setConfirm('');
    }, [setTransitState, setCurrentPassword, setPassword, setConfirm]);

    return (
        <Dialog
            fullScreen={matchesXS ? true : false}
            open={securityState.isShowingChangePassword}
            maxWidth={'xs'}
            onExited={resetForm}
        >
            {errorDialog}
            <DialogTitle className={sharedClasses.dialogTitle}>{t('pxb:CHANGE_PASSWORD.PASSWORD')}</DialogTitle>
            <DialogContent className={sharedClasses.dialogContent} style={{ flex: '1 1 auto' }}>
                {body}
            </DialogContent>
            <Divider style={{ marginTop: theme.spacing(2) }} />
            <DialogActions className={sharedClasses.dialogActions}>
                <Grid container direction="row" alignItems="center" justify="space-between" style={{ width: '100%' }}>
                    {!success && (
                        <Button
                            variant="outlined"
                            color="primary"
                            className={sharedClasses.dialogButton}
                            onClick={(): void => securityHelper.hideChangePassword()}
                        >
                            {t('pxb:ACTIONS.BACK')}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        disableElevation
                        className={clsx(sharedClasses.dialogButton, { [sharedClasses.fullWidth]: success })}
                        disabled={
                            transitState.transitInProgress ||
                            (!success && (currentPassword === '' || !areValidMatchingPasswords()))
                        }
                        color="primary"
                        onClick={
                            success
                                ? (): void => {
                                      accountUIActions.dispatch(AccountActions.logout());
                                      securityHelper.onUserNotAuthenticated();
                                  }
                                : changePassword
                        }
                    >
                        {success ? t('pxb:ACTIONS.LOG_IN') : t('pxb:ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};
