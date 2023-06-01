import React, { ChangeEvent, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { ChangePasswordDialogProps } from './types';
import { SetPassword } from '../SetPassword';
import { useLanguageLocale } from '../../../auth-shared';
import { WorkflowSecureTextField } from '../WorkflowSecureTextField';

export const ChangePasswordDialogBase: React.FC<ChangePasswordDialogProps> = (props) => {
    const { sx } = props;
    const theme = useTheme();
    const { t } = useLanguageLocale();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    // const securityState = useSecurityState();

    const [currentPassword, setCurrentPassword] = useState('');
    const passwordRef = useRef(null);

    return (
        <Dialog
            fullScreen={matchesSM ? true : false}
            // open={securityState.isShowingChangePassword}
            open={true}
            maxWidth={'md'}
            // TransitionProps={{
            //     onExited: resetForm,
            // }}
        >
            {/* {errorDialog} */}
            <DialogTitle
                sx={[
                    {
                        pt: { md: 4, sm: 2 },
                        px: { md: 3, sm: 2 },
                        pb: 0,
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                {t('blui:CHANGE_PASSWORD.PASSWORD')}
            </DialogTitle>
            <DialogContent
                sx={[
                    {
                        flex: '1 1 auto',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        pt: 2,
                        px: { md: 3, sm: 2 },
                        pb: { md: 2, sm: 3 },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                {/* {body} */}
                <WorkflowSecureTextField
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
                <SetPassword onPasswordChange={(): void => {}} />
            </DialogContent>
            <Divider sx={{ mt: 2 }} />
            <DialogActions
                sx={[
                    {
                        justifyContent: 'flex-end',
                        p: { md: 3, sm: 2 },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                {/* <Grid
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
                            sx={{ width: fullWidth ? '100%' : 100 }}
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
                </Grid> */}
            </DialogActions>
        </Dialog>
    );
};
