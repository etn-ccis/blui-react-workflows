import React from 'react';
import { CircularProgress, makeStyles, createStyles, useTheme, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: theme.palette.type === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
    })
);

type SpinnerProps = {
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
    const { visible } = props;
    const theme = useTheme();
    const classes = useStyles(theme);

    return visible ? (
        <div className={classes.background}>
            <CircularProgress size={70} variant={'indeterminate'} />
        </div>
    ) : (
        <></>
    );
};
