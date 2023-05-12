import React from 'react';
import { Typography } from '@mui/material';
import { ErrorStateProps } from './WorkflowCardTypes';

export const ErrorState: React.FC<ErrorStateProps> = (props) => {
    const { message } = props;

    return <Typography>{message}</Typography>;
};
