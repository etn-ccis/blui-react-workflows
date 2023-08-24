import React from 'react';
import CardContent, { CardContentProps } from '@mui/material/CardContent';

/**
 * Component that renders the body content for the workflow card.
 *
 * @param children content to render in the WorkflowCardBody
 *
 * @category Component
 */

export const WorkflowCardBody: React.FC<CardContentProps> = (props) => {
    const { children, sx, ...otherCardContentProps } = props;

    return (
        <CardContent
            sx={[
                {
                    display: 'flex',
                    flex: '1 1 0',
                    overflow: 'auto',
                    flexDirection: 'column',
                    pt: 2,
                    pb: { sm: 3, md: 2 },
                    px: { sm: 2, md: 3 },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...otherCardContentProps}
        >
            {children}
        </CardContent>
    );
};
