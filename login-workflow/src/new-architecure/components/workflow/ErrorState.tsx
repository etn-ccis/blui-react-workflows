import { Typography } from '@mui/material';
import React from 'react';

type ErrorStateProps = {
    message?: string;
};

export const ErrorState: React.FC<ErrorStateProps> = (props) => {
    const { message } = props;

    return <Typography>{message}</Typography>;
};
