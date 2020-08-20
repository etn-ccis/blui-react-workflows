import React from 'react';
import { CircularProgress } from '@material-ui/core';

type SpinnerProps = {
    visible?: boolean;
};
export const Spinner: React.FC<SpinnerProps> = (props) =>
    props.visible ? (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <CircularProgress size={70} variant={'indeterminate'} />
        </div>
    ) : (
        <></>
    );
