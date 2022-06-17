import React from 'react';
import { EmptyStateProps, EmptyState } from '@brightlayer-ui/react-components';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

/**
 * Component that renders a EmptyState component indicating completion of a user flow.
 *
 * @param props all props will be passed to the EmptyState component, except for style
 * which is applied to the root element
 *
 * @category Component
 */
export const FinishState: React.FC<React.PropsWithChildren<React.PropsWithChildren<EmptyStateProps>>> = (props) => {
    const { classes: emptyStateClasses = {}, style, ...emptyStateProps } = props;
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flex: '1 1 0%',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                minHeight: 500,
                [theme.breakpoints.down('sm')]: {
                    minHeight: 'auto',
                },
            }}
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
                }}
            />
        </Box>
    );
};
