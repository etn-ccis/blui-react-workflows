import React from 'react';
import { SiteOptionsScreenProps } from './types';
import {
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardBody,
    WorkflowCardInstructions,
    WorkflowCardActions,
} from '../../components';
import Box from '@mui/material/Box';
/**
 * Component that renders a success screen
 *
 * @param icon the icon to be displayed on the screen
 * @param message success message to be displayed on the screen
 * @param nextButtonLabel to display label for the next button
 * @param previousButtonLabel to display label for the previous button
 * @param onJoinExistingOrganization function to call when user wants to join existing organization
 * @param onCreateNewOrganization function to call when user wants to create a new  organization
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 *
 * @category Component
 */

export const SiteOptionsScreenBase: React.FC<React.PropsWithChildren<SiteOptionsScreenProps>> = (props) => {
    const {
        icon,
        message = '',
        nextButtonLabel = '',
        previousButtonLabel = '',
        onJoinExistingOrganization,
        onCreateNewOrganization,
    } = props;
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody>
                {icon && <Box sx={{ m: 3, mb: 5, textAlign: 'center' }}>{icon}</Box>}
                {message && <Box>{message}</Box>}
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                nextLabel={nextButtonLabel || actionsProps.nextLabel}
                previousLabel={previousButtonLabel || actionsProps.previousLabel}
                onNext={(): void => {
                    if (onJoinExistingOrganization) onJoinExistingOrganization();
                    if (actionsProps.onNext) actionsProps.onNext();
                }}
                onPrevious={(): void => {
                    if (onCreateNewOrganization) onCreateNewOrganization();
                    if (actionsProps.onPrevious) actionsProps.onPrevious();
                }}
            />
        </WorkflowCard>
    );
};
