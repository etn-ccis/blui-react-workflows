import React from 'react';
import CardContent, { CardContentProps } from '@mui/material/CardContent';

export const WorkflowCardBody: React.FC<CardContentProps> = (props) => {
    const { children, sx, ...cardContentProps } = props;

    return (
        <>
            <CardContent
                sx={[
                    {
                        flex: '1 1 0px',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        pt: 2,
                        pb: { sm: 3, md: 2 },
                        px: { sm: 2, md: 3 },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
                {...cardContentProps}
            >
                {children}
            </CardContent>
        </>
    );
};
