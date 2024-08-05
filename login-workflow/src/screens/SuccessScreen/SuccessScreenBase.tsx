import React from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import { SuccessScreenProps } from './types';
import { EmptyState } from '@brightlayer-ui/react-components';
import Box from '@mui/material/Box';

/**
 * Component that renders a success screen
 *
 * @param {SuccessScreenProps} props - props of SuccessScreen base component
 *
 * @category Component
 */

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const { EmptyStateProps, dismissButtonLabel = '', canDismiss, onDismiss, ...otherProps } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    return (
        <WorkflowCard {...cardBaseProps} {...otherProps}>
            <WorkflowCardHeader {...headerProps} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody>
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
                    ]}
                >
                    {EmptyStateProps && (
                        <EmptyState
                            sx={{
                                color: 'inherit',
                                p: 0,
                            }}
                            {...EmptyStateProps}
                        />
                    )}
                </Box>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                nextLabel={dismissButtonLabel || actionsProps.nextLabel}
                canGoNext={canDismiss}
                onNext={(): void => {
                    if (onDismiss) onDismiss();
                    if (actionsProps.onNext) actionsProps.onNext();
                }}
            />
        </WorkflowCard>
    );
};
