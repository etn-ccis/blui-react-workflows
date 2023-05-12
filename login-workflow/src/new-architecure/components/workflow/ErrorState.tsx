import React from 'react';
import { Typography } from '@mui/material';
import { ErrorStateProps } from './WorkflowCard.types';

export const ErrorState: React.FC<ErrorStateProps> = (props) => {
    const { message } = props;

    return <Typography sx={{ color: 'error.main' }}>{message}</Typography>;
};
