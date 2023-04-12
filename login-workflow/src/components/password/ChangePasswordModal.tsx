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
} from '@brightlayer-ui/react-auth-shared';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ChangePasswordForm } from './ChangePasswordForm';
import { SecureTextField } from '../SecureTextField';
import { SimpleDialog } from '../SimpleDialog';
import { FinishState } from '../FinishState';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { defaultPasswordRequirements } from '../../constants';
import { DialogButtonStyles, DialogActionsStyles, DialogContentStyles, DialogTitleStyles } from '../../styles';

/**
 * Component that renders a change password form in a modal dialog. This dialog is automatically
 * shown and hidden based on the securityState context. It can be opened by calling
 * useSecurityActions().showChangePassword().
 *
 * @category Component
 */
export const ChangePasswordModal: React.FC<React.PropsWithChildren<React.PropsWithChildren>> = () => {
    const { t } = useLanguageLocale();
    const securityState = useSecurityState();
    const accountUIActions = useAccountUIActions();
    const securityHelper = useSecurityActions();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

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
            if (error instanceof Error) {
                setTransitState(transitFailed(error.message));
                throw error;
            } else throw error;
        }
    }, [accountUIActions, currentPassword, password]);

    // Dynamically change the body content based on successful change
    let body: JSX.Element;
    if (success) {
        body = (
            <FinishState
                icon={<CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 2 }} />}
                title={t('blui:CHANGE_PASSWORD.PASSWORD_CHANGED')}
                description={t('blui:CHANGE_PASSWORD.SUCCESS_MESSAGE')}
            />
        );
    } else {
        body = (
            <ChangePasswordForm
                passwordLabel={t('blui:LABELS.NEW_PASSWORD')}
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
                isInvalidConfirmPassword={!areValidMatchingPasswords()}
            >
                <SecureTextField
                    id="current-password"
                    label={t('blui:LABELS.CURRENT_PASSWORD')}
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
            title={t('blui:MESSAGES.ERROR')}
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
            fullScreen={matchesSM ? true : false}
            open={securityState.isShowingChangePassword}
            maxWidth={'xs'}
            TransitionProps={{
                onExited: resetForm,
            }}
        >
            {errorDialog}
            <DialogTitle sx={DialogTitleStyles(theme)}>{t('blui:CHANGE_PASSWORD.PASSWORD')}</DialogTitle>
            <DialogContent sx={{ ...DialogContentStyles(theme), flex: '1 1 auto' }}>{body}</DialogContent>
            <Divider sx={{ mt: 2 }} />
            <DialogActions sx={DialogActionsStyles(theme)}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: '100%' }}
                >
                    {!success && (
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={DialogButtonStyles()}
                            onClick={(): void => securityHelper.hideChangePassword()}
                        >
                            {t('blui:ACTIONS.BACK')}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        disableElevation
                        sx={DialogButtonStyles(success)}
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
                        {success ? t('blui:ACTIONS.LOG_IN') : t('blui:ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};
