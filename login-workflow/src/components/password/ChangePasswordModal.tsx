import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Grid, useTheme, makeStyles, Theme, createStyles } from '@material-ui/core';
import {
    useSecurityState, useAccountUIState, useSecurityActions, useLanguageLocale, useAccountUIActions,
    // Actions
    initialTransitState,
    transitSuccess,
    transitStart,
    transitFailed,
    AccountActions,
    PasswordRequirement,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
    SPECIAL_CHAR_REGEX,
    useInjectedUIContext
} from '@pxblue/react-auth-shared';
import { ChangePasswordForm } from './ChangePasswordForm';
import { SecureTextField } from '../SecureTextField';
import { EmptyState } from '@pxblue/react-components';
import { CheckCircle } from '@material-ui/icons';
import { Trans } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        description: {
            color: 'inherit',
        },
    })
);

export const ChangePasswordModal: React.FC = () => {
    const { t } = useLanguageLocale();
    const securityState = useSecurityState();
    const accountUIActions = useAccountUIActions();
    const accountUIState = useAccountUIState();
    const securityHelper = useSecurityActions();
    const theme = useTheme();
    const classes = useStyles();

    const [transitState, setTransitState] = useState(initialTransitState);
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    // Network state (setPassword)
    const setPasswordTransit = accountUIState.setPassword.setPasswordTransit;
    const setPasswordTransitSuccess = setPasswordTransit.transitSuccess;

    const updateFields = useCallback((fields: { password: string, confirm: string }) => {
        setPassword(fields.password);
        setConfirm(fields.confirm);
        console.log(fields);
    }, [setPassword, setConfirm]);

    // const resetPassword = useCallback(
    //     (password: string): void => {
    //         void accountUIActions.actions.changePassword('oldPassword', password);
    //     },
    //     [accountUIActions, code, email]
    // );

    // const onContinue = useCallback(() => {
    //     if (setPasswordTransitSuccess) {
    //         securityHelper.onUserNotAuthenticated();
    //     } else {
    //         resetPassword(passwordInput);
    //     }
    // }, [resetPassword, setPasswordTransitSuccess, passwordInput, history]);

    const defaultRequirements: PasswordRequirement[] = [
        {
            regex: LENGTH_REGEX,
            description: t('PASSWORD_REQUIREMENTS.LENGTH'),
        },
        {
            regex: NUMBERS_REGEX,
            description: t('PASSWORD_REQUIREMENTS.NUMBERS'),
        },
        {
            regex: UPPER_CASE_REGEX,
            description: t('PASSWORD_REQUIREMENTS.UPPER'),
        },
        {
            regex: LOWER_CASE_REGEX,
            description: t('PASSWORD_REQUIREMENTS.LOWER'),
        },
        {
            regex: SPECIAL_CHAR_REGEX,
            description: t('PASSWORD_REQUIREMENTS.SPECIAL'),
        },
    ];
    const { passwordRequirements = defaultRequirements } = useInjectedUIContext();

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
            console.log('success');
            setTransitState(transitSuccess());
        } catch (error) {
            console.log('error');
            setTransitState(transitFailed(error.errorMessage));
        }
    }, [accountUIActions, currentPassword, password]);

    let body: JSX.Element;
    if (transitState.transitSuccess) {
        body = (
            <div
                style={{ display: 'flex', flex: '1 1 0%', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 500 }}
            >
                <EmptyState
                    icon={<CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: 16 }} />}
                    title={t('CHANGE_PASSWORD.PASSWORD_CHANGED')}
                    description={t('CHANGE_PASSWORD.SUCCESS_MESSAGE')}
                    classes={{ description: classes.description }}
                />
            </div>
        );
    } else {
        body = (
            <ChangePasswordForm passwordLabel={t('LABELS.NEW_PASSWORD')} onPasswordChange={updateFields}>
                <SecureTextField label={t('LABELS.CURRENT_PASSWORD')} value={currentPassword} onChange={(evt: ChangeEvent<HTMLInputElement>): void => setCurrentPassword(evt.target.value)} style={{ marginBottom: theme.spacing(2) }} />
            </ChangePasswordForm>
        );
    }

    const resetForm = useCallback(() => {
        setTransitState(initialTransitState);
        setCurrentPassword('');
        setPassword('');
        setConfirm('');
    }, [setTransitState, setCurrentPassword, setPassword, setConfirm]);


    return (
        <Dialog open={securityState.isShowingChangePassword} maxWidth={'xs'} onExited={resetForm}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent style={{ flex: '1 1 auto', overflow: 'auto' }}>
                {body}
            </DialogContent>

            <DialogActions style={{ padding: 16 }}>
                <Grid container direction="row" alignItems="center" justify="space-between" style={{ width: '100%' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={transitState.transitSuccess}
                        onClick={(): void => securityHelper.hideChangePassword()}
                        style={{ width: 100 }}
                    >
                        {t('ACTIONS.BACK')}
                    </Button>
                    <Button
                        variant="contained"
                        // disabled={!canContinue()}
                        disabled={!transitState.transitSuccess && (currentPassword === '' || !areValidMatchingPasswords())}
                        color="primary"
                        // onClick={onContinue}
                        // onClick={() => securityHelper.hideChangePassword()}
                        onClick={transitState.transitSuccess ? () => {
                            securityHelper.onUserNotAuthenticated();
                        } : changePassword}
                        style={{ width: 100 }}
                    >
                        {transitState.transitSuccess ? t('ACTIONS.LOG_IN') : t('ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}