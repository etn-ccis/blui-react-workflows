import React from 'react';
import { EmptyStateProps, EmptyState } from '@brightlayer-ui/react-components';
import Box from '@mui/material/Box';

/**
 * Component that renders a EmptyState component indicating completion of a user flow.
 *
 * @param props all props will be passed to the EmptyState component, except for style
 * which is applied to the root element
 *
 * @category Component
 */

export const WorkflowFinishState: React.FC<React.PropsWithChildren<React.PropsWithChildren<EmptyStateProps>>> = (
    props
) => {
    const { classes: emptyStateClasses = {}, style, sx, ...emptyStateProps } = props;

    return (
        <Box
            sx={[
                {
                    display: 'flex',
                    flex: '1 1 0%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    minHeight: { md: 500, sm: 'auto' },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            style={style}
        >
            <EmptyState
                {...emptyStateProps}
                classes={{
                    ...emptyStateClasses,
                    description: emptyStateClasses.description,
                }}
                sx={{
                    color: 'inherit',
                    p: 0,
                }}
            />
        </Box>
    );
};
