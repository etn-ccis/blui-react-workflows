import React from 'react';
import { Divider, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components/WorkflowCard';
import { ContactScreenProps } from './types';
import Box from '@mui/material/Box';

/**
 * Component renders a screen with contact information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param title to display in the header
 * @param icon to display in the icon
 * @param description to display the contact support content
 * @param contactEmail to display the contact email
 * @param contactPhone to display contact phone number
 * @param dismissButtonLabel to display label text in button
 * @param onDismiss function to call when user clicks button
 * @param slots used for each slot in `ContactScreen`
 * @param slotProps applied to each slot
 *
 * @category Component
 */

const LinkStyles = (theme?: Theme): SxProps<Theme> => ({
    fontWeight: 600,
    textTransform: 'none',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:visited': {
        color: 'inherit',
    },
    '&:hover': {
        cursor: 'pointer',
    },
});

export const ContactScreenBase: React.FC<ContactScreenProps> = (props) => {
    const {
        title,
        icon,
        emailSupportTitle,
        emailSupportContent,
        phoneSupportTitle,
        phoneSupportContent = (phone: string): string => '',
        contactEmail,
        contactPhone,
        dismissButtonLabel,
        onDismiss,
    } = props;

    const theme = useTheme();

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} title={title || headerProps.title} />
            <Box sx={{ m: 3, mb: 5, textAlign: 'center' }}>{icon}</Box>
            <WorkflowCardBody>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    {' '}
                    {emailSupportTitle}
                </Typography>
                {emailSupportContent && (
                    <Typography variant="body1">
                        {' '}
                        {typeof emailSupportContent === 'string'
                            ? emailSupportContent
                            : emailSupportContent(contactEmail)}
                    </Typography>
                )}
                {!emailSupportContent && (
                    <Typography variant="body1">
                        {`For questions, feedback, or support please email us at `}
                        <Typography variant="button" sx={{ ...LinkStyles(theme), fontSize: 'inherit' }}>
                            {contactEmail}
                        </Typography>
                        {`.`}
                    </Typography>
                )}

                {/* <Typography variant="body1"> {phoneSupportTitle}</Typography>
                <Typography variant="body1"> {typeof phoneSupportContent === "string" ? phoneSupportContent : phoneSupportContent(contactPhone)}</Typography>
                <Typography variant="body1" className="link">{contactPhone}</Typography> */}
            </WorkflowCardBody>
            <Divider />
            <WorkflowCardActions
                {...actionsProps}
                nextLabel={dismissButtonLabel || actionsProps.nextLabel}
                // canGoNext={true}
                onNext={(): void => {
                    if (onDismiss) onDismiss();
                    if (actionsProps.onNext) actionsProps.onNext();
                }}
            />
        </WorkflowCard>
    );
};
