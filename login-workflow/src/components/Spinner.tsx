import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export type SpinnerProps = {
    visible?: boolean;
};
/**
 * Component that renders a indeterminate circular progress spinner atop a semi-transparent white background.
 *
 * @param visible True if the spinner should be displayed, false to render nothing
 *
 * @category Component
 */
export const Spinner: React.FC<React.PropsWithChildren<React.PropsWithChildren<SpinnerProps>>> = (props) => {
    const { visible } = props;
    const theme = useTheme();

    return visible ? (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <CircularProgress size={70} variant={'indeterminate'} />
        </Box>
    ) : (
        <></>
    );
};
