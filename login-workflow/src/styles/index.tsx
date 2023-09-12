import { SxProps, Theme } from '@mui/material/styles';

export const DialogTitleStyles = (): SxProps<Theme> => ({
    pt: { md: 4, sm: 2 },
    px: { md: 3, sm: 2 },
    pb: 0,
});

export const DialogContentStyles = (): SxProps<Theme> => ({
    flex: '1 1 0px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    pt: 2,
    px: { md: 3, sm: 2 },
    pb: { md: 2, sm: 3 },
});

export const DialogActionsStyles = (): SxProps<Theme> => ({
    justifyContent: 'flex-end',
    p: { md: 3, sm: 2 },
});

export const DialogButtonStyles = (fullWidth = false): SxProps<Theme> => ({
    width: fullWidth ? '100%' : 100,
});

export const FullDividerStyles = (): SxProps<Theme> => ({
    mt: 5,
    mb: 4,
    mx: { md: -3, sm: -2 },
});

export const StepperStyles = {
    background: 'transparent',
    width: '100%',
    p: 0,
};

export const StepperDotStyles = (): any => ({
    my: 0,
    mx: 0.5,
});

export const TextFieldStyles = (): SxProps<Theme> => ({
    mt: { md: 4, sm: 3 },
});

export const LinkStyles = {
    fontWeight: 600,
    textTransform: 'none',
    textDecoration: 'none',
    color: 'primary.main',
    '&:visited': {
        color: 'inherit',
    },
    '&:hover': {
        cursor: 'pointer',
    },
};
