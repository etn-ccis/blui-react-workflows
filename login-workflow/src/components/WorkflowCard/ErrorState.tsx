import React from 'react';
import { Typography } from '@mui/material';
import { ErrorStateProps } from './WorkflowCard.types';

export const ErrorState: React.FC<ErrorStateProps> = (props) => {
    const { message, sx, ...otherTypographyProps } = props;

    return (
        <Typography sx={[{ color: 'error.main' }, ...(Array.isArray(sx) ? sx : [sx])]} {...otherTypographyProps}>
            {message}
        </Typography>
    );
};
