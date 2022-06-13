import { Theme } from '@mui/material/styles';

export const DialogTitleStyles = (theme: Theme) => ({
    p: `${theme.spacing(4)} ${theme.spacing(3)} 0 ${theme.spacing(3)}`,
    [theme.breakpoints.down('sm')]: {
        p: `${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
    },
});

export const DialogContentStyles = (theme: Theme) => ({
    flex: '1 1 0px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    p: `${theme.spacing(2)} ${theme.spacing(3)}`,
    [theme.breakpoints.down('sm')]: {
        p: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)}`,
    },
});

export const DialogActionsStyles = (theme: Theme) => ({
    p: 3,
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
        p: 2,
    },
});

export const DialgButtonStyles = (fullWidth = false) => ({
    width: fullWidth ? '100%' : 100,
});

export const FullDividerStyles = (theme: Theme) => ({
    m: `${theme.spacing(5)} -${theme.spacing(3)} ${theme.spacing(4)}`,
    [theme.breakpoints.down('sm')]: {
        m: `${theme.spacing(5)} -${theme.spacing(2)} ${theme.spacing(4)}`,
    },
});

export const StepperStyles = {
    background: 'transparent',
    width: '100%',
    p: 0,
};

export const StepperDotStyles = (theme: Theme) => ({
    m: `0px ${theme.spacing(0.5)}`,
});

export const TextFieldStyles = (theme: Theme) => ({
    mt: 4,
    [theme.breakpoints.down('sm')]: {
        mt: 3,
    },
});
