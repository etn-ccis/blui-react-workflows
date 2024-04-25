import React from 'react';
import { Typography } from '@mui/material';
import { ErrorStateProps } from './WorkflowCard.types';

/**
 * Component renders a screen with ErrorState to display error message for support with the application.
 *
 * @param {ErrorStateProps} props - props of ErrorStateProps component
 *
 * @category Component
 */

export const ErrorState: React.FC<ErrorStateProps> = (props) => {
    const { message, sx, ...otherTypographyProps } = props;

    return (
        <Typography sx={[{ color: 'error.main' }, ...(Array.isArray(sx) ? sx : [sx])]} {...otherTypographyProps}>
            {message}
        </Typography>
    );
};
