import React, { useState } from 'react';
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
import { useLanguageLocale } from '../../../auth-shared';
import { WorkflowSecureTextField } from '../WorkflowSecureTextField';
import { FullDividerStyles } from '../../../styles';

export const ChangePasswordDialogBase: React.FC<ChangePasswordDialogProps> = (props) => {
    const { sx, open, currentPwdRef, enableButton, currentPasswordChange } = props;
    const theme = useTheme();
    const { t } = useLanguageLocale();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentPassword, setCurrentPassword] = useState('');

    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };

    const handleChange = (event: any): void => {
        setCurrentPassword(event.target.value);
        currentPasswordChange(event.target.value);
    };

    return (
        <Dialog fullScreen={matchesSM ? true : false} open={open} maxWidth={'xs'}>
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

                <Divider sx={FullDividerStyles(theme)} />
                <SetPassword {...passwordProps}>
                    <WorkflowSecureTextField
                        id="current-password"
                        label={t('blui:LABELS.CURRENT_PASSWORD')}
                        inputRef={currentPwdRef}
                        value={currentPassword}
                        onChange={handleChange}
                        onKeyPress={(e): void => {
                            if (e.key === 'Enter' && passwordProps.passwordRef.current) {
                                passwordProps.passwordRef.current.focus();
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
                    <Button variant="outlined" color="primary" sx={{ width: 100 }}>
                        {t('blui:ACTIONS.BACK')}
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{ width: 100 }}
                        disabled={!enableButton}
                        color="primary"
                    >
                        {t('blui:ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};
