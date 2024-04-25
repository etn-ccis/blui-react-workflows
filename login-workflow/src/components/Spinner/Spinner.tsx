import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SpinnerProps } from './types';

/**
 * Component that renders a indeterminate circular progress spinner atop a semi-transparent white background.
 *
 * @param {SpinnerProps} props - props of spinner component
 *
 * @category Component
 */
export const Spinner: React.FC<SpinnerProps> = (props) => {
    const { visible, sx, ...otherProps } = props;

    return visible ? (
        <Box
            sx={[
                {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1000,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...otherProps}
        >
            <CircularProgress size={70} variant={'indeterminate'} />
        </Box>
    ) : (
        <></>
    );
};
