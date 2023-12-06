import React, { useCallback, useState } from 'react';
import { CreateNewOrgScreenProps } from './types';
import { CreateNewOrgScreenBase } from './CreateNewOrgScreenBase';
import { useRegistrationWorkflowContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DomainIcon from '@mui/icons-material/Domain';

/**
 * Component that renders a screen for the user to enter an organization name to start the
 * organization creation process.
 *
 * @param icon the icon to display
 * @param message the message to be displayed on the screen
 * @param orgNameLabel label for the organization name field
 * @param initialValue initial value for the orgName text field
 * @param orgNameValidator function used to test the organization name input for valid formatting
 * @param orgNameTextFieldProps props to pass to the organization name text field
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 *
 * @category Component
 */

export const CreateNewOrgScreen: React.FC<CreateNewOrgScreenProps> = (props) => {
    const { t } = useTranslation();
    const NewOrgInstructions = (): JSX.Element => (
        <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
                {`${t('bluiRegistration:SELF_REGISTRATION.NEW_ORG.MESSAGE_1')}`}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                {`${t('bluiRegistration:SELF_REGISTRATION.NEW_ORG.MESSAGE_2')}`}
            </Typography>
            <Typography variant="body1">{`${t('bluiRegistration:SELF_REGISTRATION.NEW_ORG.MESSAGE_3')}`}</Typography>
        </Box>
    );
    const { icon = <DomainIcon color={'primary'} sx={{ fontSize: 54 }} />, message = NewOrgInstructions() } = props;
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, totalScreens, currentScreen } = regWorkflow;
    const [organizationNameInputValue, setOrganizationNameInputValue] = useState(
        screenData?.Other?.CreateOrganization?.organizationName || ''
    );
    const [isLoading, setIsLoading] = useState(false);
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const onNext = useCallback(() => {
        try {
            setIsLoading(true);
            void nextScreen({
                screenId: 'CreateOrganization',
                values: { organizationName: organizationNameInputValue } as any,
            });
        } catch (_error) {
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [organizationNameInputValue, nextScreen, triggerError]);

    const onPrevious = (): void => {
        previousScreen({
            screenId: 'CreateOrganization',
            values: { organizationName: organizationNameInputValue } as any,
        });
    };

    const {
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        orgNameLabel = t('bluiCommon:LABELS.ORG_NAME'),
        initialValue = screenData?.Other?.CreateOrganization?.organizationName as string,
        orgNameValidator = (orgName: string): boolean | string => {
            if (orgName?.length > 0) {
                return true;
            }
            return t('bluiRegistration:SELF_REGISTRATION.NEW_ORG.ORG_NAME_ENTRY_ERROR');
        },
        orgNameTextFieldProps,
    } = props;

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:SELF_REGISTRATION.NEW_ORG.SCREEN_TITLE'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        ...WorkflowCardInstructionProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        showPrevious: true,
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoPrevious: true,
        currentStep: currentScreen,
        totalSteps: totalScreens,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void onNext();
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            void onPrevious();
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    const onOrganizationNameInputValueChange = (e: any): void => {
        setOrganizationNameInputValue(e.target.value);
    };

    return (
        <CreateNewOrgScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            icon={icon}
            message={message}
            orgNameLabel={orgNameLabel}
            initialValue={initialValue || ''}
            orgNameTextFieldProps={{ ...orgNameTextFieldProps, onChange: onOrganizationNameInputValueChange }}
            orgNameValidator={orgNameValidator}
            WorkflowCardActionsProps={workflowCardActionsProps}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
