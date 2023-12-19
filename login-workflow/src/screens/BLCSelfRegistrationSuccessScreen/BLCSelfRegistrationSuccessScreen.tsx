import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { SuccessScreenBase, SuccessScreenProps } from '..';
import { useRegistrationWorkflowContext, useRegistrationContext } from '../../contexts';
import Box from '@mui/material/Box';
import { AccountCircle, Business } from '@mui/icons-material';

/**
 * Component that renders a success screen for when registration completes.
 *
 * @param icon the icon to be displayed on the screen
 * @param messageTitle title of the success message
 * @param message success message to be displayed on the screen
 * @param onDismiss function to call when user clicks button
 * @param canDismiss function to call when the dismiss button is clicked
 *
 * @category Component
 */

const BLCSelfRegistrationSuccessIcons = (): JSX.Element => (
    <Box sx={{ display: 'flex' }}>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100px',
                height: '100px',
                backgroundColor: '#e0eff8',
                borderRadius: '50%',
            }}
        >
            <AccountCircle color={'primary'} sx={{ fontSize: 54 }} />
        </Box>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100px',
                height: '100px',
                backgroundColor: '#e0eff8',
                borderRadius: '50%',
                ml: 3,
            }}
        >
            <Business color={'primary'} sx={{ fontSize: 54 }} />
        </Box>
    </Box>
);

export const BLCSelfRegistrationSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const { navigate, routeConfig } = useRegistrationContext();
    const { t } = useTranslation();

    const {
        screenData: {
            AccountDetails: { firstName, lastName },
            CreateAccount: { emailAddress: email }, // @TODO, get email from the url params or some other location as the CreateAccountScreen wont be part of this workflow at the end.
            Other: {
                // @ts-ignore
                CreateOrganization: { organizationName: organization },
            },
        },
    } = useRegistrationWorkflowContext();

    const {
        icon = <BLCSelfRegistrationSuccessIcons />,
        messageTitle = `${t('bluiCommon:MESSAGES.WELCOME')}, ${firstName} ${lastName}!`,
        message = (
            <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                    Your account has successfully been created with the email <b>{email}</b>.
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                    Your Organization<b>{` ${String(organization)}`}</b> has also been successfully created and you are
                    now the Admin.
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                    You can now Login using your email address and password associated with your account.
                </Typography>
            </Box>
        ),
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        canDismiss = true,
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        ...otherRegistrationSuccessScreenProps
    } = props;

    const workflowCardHeaderProps = {
        title: t('Account & Organization Created'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardActionsProps = {
        nextLabel: t('Return to Login'),
        showNext: true,
        canGoNext: canDismiss,
        fullWidthButton: true,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            onDismiss();
            WorkflowCardActionsProps?.onNext?.();
        },
    };

    return (
        <SuccessScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            icon={icon}
            messageTitle={messageTitle}
            message={message}
            {...otherRegistrationSuccessScreenProps}
        />
    );
};
