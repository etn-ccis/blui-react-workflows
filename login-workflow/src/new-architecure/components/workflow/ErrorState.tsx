import React from 'react';
import { Typography } from '@mui/material';
import { ErrorStateProps } from './WorkflowCard.types';

export const ErrorState: React.FC<ErrorStateProps> = (props) => {
    const { message, ...otherTypographyProps } = props;

    return (
        <Typography sx={{ color: 'error.main' }} {...otherTypographyProps}>
            {message}
        </Typography>
    );
};
