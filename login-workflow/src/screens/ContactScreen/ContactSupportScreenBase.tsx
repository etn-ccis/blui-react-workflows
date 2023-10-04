import React from 'react';
import { Typography } from '@mui/material';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import { ContactSupportScreenProps } from './types';
import Box, { BoxProps } from '@mui/material/Box';
import { ContactScreenClassKey, getContactScreenUtilityClass } from './utilityClasses';
import { unstable_composeClasses as composeClasses } from '@mui/base';

/**
 * Component renders a screen with contact information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param icon the icon to display in the header
 * @param emailSupportTitle text to display as the contact support title
 * @param emailSupportContent content to display as the contact support content
 * @param phoneSupportTitle text to display as the phone support title
 * @param phoneSupportContent content to display as the phone support content
 * @param contactEmail to display the contact email
 * @param contactPhone to display contact phone number
 * @param dismissButtonLabel to display label for the button
 * @param onDismiss function to call when user clicks button
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 *
 * @category Component
 */

const useUtilityClasses = (ownerState: ContactSupportScreenProps & BoxProps): Record<ContactScreenClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        title: ['title'],
        icon: ['icon'],
        emailSupportTitle: ['emailSupportTitle'],
        emailSupportContent: ['emailSupportContent'],
        phoneSupportTitle: ['phoneSupportTitle'],
        phoneSupportContent: ['phoneSupportContent'],
        contactEmail: ['contactEmail'],
        contactPhone: ['contactPhone'],
        dismissButtonLabel: ['dismissButtonLabel'],
    };

    return composeClasses(slots, getContactScreenUtilityClass, classes);
};

export const ContactSupportScreenBase: React.FC<ContactSupportScreenProps> = (props) => {
    const {
        icon,
        emailSupportTitle,
        emailSupportContent,
        phoneSupportTitle,
        phoneSupportContent,
        contactEmail,
        contactPhone,
        dismissButtonLabel,
        onDismiss,
    } = props;

    const defaultClasses = useUtilityClasses(props);

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    return (
        <WorkflowCard {...cardBaseProps} className={defaultClasses.root} data-testid={defaultClasses.root}>
            <WorkflowCardHeader {...headerProps} className={defaultClasses.title} data-testid={defaultClasses.title} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            {icon && (
                <Box sx={{ m: 3, mb: 5, textAlign: 'center' }} className={defaultClasses.icon}>
                    {icon}
                </Box>
            )}
            <WorkflowCardBody>
                <Typography
                    className={defaultClasses.emailSupportTitle}
                    data-testid={defaultClasses.emailSupportTitle}
                    variant="body1"
                    sx={{ mb: 1 }}
                >
                    {' '}
                    {emailSupportTitle}
                </Typography>
                <>{emailSupportContent?.(contactEmail ?? '')}</>
                <Typography
                    className={defaultClasses.phoneSupportTitle}
                    data-testid={defaultClasses.phoneSupportTitle}
                    variant="body1"
                    sx={{ mt: 4, mb: 1 }}
                >
                    {' '}
                    {phoneSupportTitle}
                </Typography>
                <>{phoneSupportContent?.(contactPhone ?? '')}</>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                nextLabel={dismissButtonLabel || actionsProps.nextLabel}
                className={defaultClasses.dismissButtonLabel}
                onNext={(): void => {
                    if (onDismiss) onDismiss();
                    if (actionsProps.onNext) actionsProps.onNext();
                }}
            />
        </WorkflowCard>
    );
};
