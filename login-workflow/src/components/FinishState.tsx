import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { EmptyStateProps, EmptyState } from '@pxblue/react-components';
import clsx from 'clsx';

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            display: 'flex',
            flex: '1 1 0%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            minHeight: 500,
        },
        description: {
            color: 'inherit',
        },
    })
);
/**
 * Component that renders a EmptyState component indicating completion of a user flow.
 *
 * @param props all props will be passed to the EmptyState component, except for style
 * which is applied to the root element
 *
 * @category Component
 */
export const FinishState: React.FC<EmptyStateProps> = (props) => {
    const { classes: emptyStateClasses = {}, style, ...emptyStateProps } = props;
    const classes = useStyles();
    return (
        <div className={classes.wrapper} style={style}>
            <EmptyState
                {...emptyStateProps}
                classes={{
                    ...emptyStateClasses,
                    description: clsx(classes.description, emptyStateClasses.description),
                }}
            />
        </div>
    );
};
