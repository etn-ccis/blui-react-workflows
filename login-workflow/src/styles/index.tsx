import { createStyles } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const useDialogStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogTitle: {
            padding: `${theme.spacing(4)}px ${theme.spacing(3)}px 0 ${theme.spacing(3)}px`,
            [theme.breakpoints.down('xs')]: {
                padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
            },
        },
        dialogContent: {
            flex: '1 1 0px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
            [theme.breakpoints.down('xs')]: {
                padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(2)}px`,
            },
        },
        dialogActions: {
            padding: theme.spacing(3),
            justifyContent: 'flex-end',
            [theme.breakpoints.down('xs')]: {
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
            margin: `${theme.spacing(5)}px -${theme.spacing(3)}px ${theme.spacing(4)}px`,
            [theme.breakpoints.down('xs')]: {
                margin: `${theme.spacing(5)}px -${theme.spacing(2)}px ${theme.spacing(4)}px`,
            },
        },
        stepper: {
            background: 'transparent',
            width: '100%',
            padding: 0,
        },
        stepperDot: {
            margin: `0px ${theme.spacing(0.5)}px`,
        },
        textField: {
            marginTop: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(3),
            },
        },
        fullWidth: {},
    })
);
