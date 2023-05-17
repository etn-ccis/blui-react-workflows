import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { WorkflowCardHeaderProps } from './WorkflowCard.types';

export const WorkflowCardHeader: React.FC<WorkflowCardHeaderProps> = (props) => {
    const { title, sx, ...otherCardHeaderProps } = props;

    return (
        <CardHeader
            title={typeof title === 'string' ? <Typography variant={'h6'}>{title}</Typography> : title}
            sx={[
                {
                    pt: { md: 4, sm: 2 },
                    px: { md: 3, sm: 2 },
                    pb: 0,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...otherCardHeaderProps}
        />
    );
};
