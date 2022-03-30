/* eslint-disable @typescript-eslint/naming-convention */
import { Theme } from '@mui/material/styles';

import { StyleRules } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';

export const sharedDialogStyles: (theme: Theme) => StyleRules = (theme: Theme) =>
    createStyles({
        dialogTitle: {
            padding: `${theme.spacing(4)} ${theme.spacing(3)} 0 ${theme.spacing(3)}`,
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
            },
        },
        dialogContent: {
            flex: '1 1 0px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)}`,
            },
        },
        dialogActions: {
            padding: theme.spacing(3),
            justifyContent: 'flex-end',
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(2),
            },
        },
        dialogButton: {
            width: 100,
            '&$fullWidth': {
                width: '100%',
            },
        },
        fullDivider: {
            margin: `${theme.spacing(5)} -${theme.spacing(3)} ${theme.spacing(4)}`,
            [theme.breakpoints.down('sm')]: {
                margin: `${theme.spacing(5)} -${theme.spacing(2)} ${theme.spacing(4)}`,
            },
        },
        stepper: {
            background: 'transparent',
            width: '100%',
            padding: 0,
        },
        stepperDot: {
            margin: `0px ${theme.spacing(0.5)}`,
        },
        textField: {
            marginTop: theme.spacing(4),
            [theme.breakpoints.down('sm')]: {
                marginTop: theme.spacing(3),
            },
        },
        fullWidth: {},
    });
