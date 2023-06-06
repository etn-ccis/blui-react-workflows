import React, { ChangeEvent, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { ChangePasswordDialogProps } from './types';
import { SetPassword } from '../SetPassword';
import { initialTransitState, useAccountUIActions, useLanguageLocale, useSecurityActions } from '../../../auth-shared';
import { WorkflowSecureTextField } from '../WorkflowSecureTextField';
import { DialogButtonStyles } from '../../../styles';

export const ChangePasswordDialogBase: React.FC<ChangePasswordDialogProps> = (props) => {
    const { sx } = props;
    const theme = useTheme();
    const { t } = useLanguageLocale();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    // const securityState = useSecurityState();

    const [currentPassword, setCurrentPassword] = useState('');
    const passwordRef = useRef(null);

    const [transitState, setTransitState] = useState(initialTransitState);
    const success = transitState.transitSuccess;

    // const securityHelper = useSecurityActions();
    // const accountUIActions = useAccountUIActions();

    return (
        <Dialog
            fullScreen={matchesSM ? true : false}
            // open={securityState.isShowingChangePassword}
            open={true}
            maxWidth={'xs'}
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
                <Typography>{t('blui:CHANGE_PASSWORD.PASSWORD_INFO')}</Typography>
                <Divider sx={{ mt: 5, mb: 4, mx: { md: -3, xs: -2 } }} />
                <SetPassword onPasswordChange={(): void => {}}>
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
                </SetPassword>
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
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: '100%' }}
                >
                    {/* {!success && ( */}
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ width: 100 }}
                        // onClick={(): void => securityHelper.hideChangePassword()}
                    >
                        {t('blui:ACTIONS.BACK')}
                    </Button>
                    {/* )} */}
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{ width: 100 }}
                        // disabled={
                        //     transitState.transitInProgress ||
                        //     (!success && (currentPassword === '' || !areValidMatchingPasswords()))
                        // }
                        color="primary"
                        // onClick={
                        //     success
                        //         ? (): void => {
                        //               accountUIActions.dispatch(AccountActions.logout());
                        //               securityHelper.onUserNotAuthenticated();
                        //           }
                        //         : changePassword
                        // }
                    >
                        {success ? t('blui:ACTIONS.LOG_IN') : t('blui:ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};