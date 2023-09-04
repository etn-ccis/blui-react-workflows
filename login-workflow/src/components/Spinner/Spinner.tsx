import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

export type SpinnerProps = BoxProps & {
    /**
     * True if the spinner should be displayed, false to render nothing
     */
    visible?: boolean;
};
/**
 * Component that renders a indeterminate circular progress spinner atop a semi-transparent white background.
 *
 * @param visible True if the spinner should be displayed, false to render nothing
 *
 * @category Component
 */
export const Spinner: React.FC<SpinnerProps> = (props) => {
    const { visible, ...otherProps } = props;
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
            {...otherProps}
        >
            <CircularProgress size={70} variant={'indeterminate'} />
        </Box>
    ) : (
        <></>
    );
};
