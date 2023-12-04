import React, { useCallback, useState } from 'react';
import { CreateNewOrgScreenProps } from './types';
import { CreateNewOrgScreenBase } from './CreateNewOrgScreenBase';
import { useRegistrationContext } from '../../contexts/RegistrationContext/context';
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
    const { actions } = useRegistrationContext();
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

    const NewOrgInstructions = (): JSX.Element => (
        <Box sx={{ p: '16px 24px 0', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#e0eff8',
                    borderRadius: '50%',
                    alignSelf: 'center',
                    mb: 6,
                    mt: 2,
                }}
            >
                <DomainIcon color={'primary'} sx={{ fontSize: 54 }} />
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
                {`${t('bluiRegistration:SELF_REGISTRATION.NEW_ORG.MESSAGE_1')}`}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                {`${t('bluiRegistration:SELF_REGISTRATION.NEW_ORG.MESSAGE_2')}`}
            </Typography>
            <Typography variant="body1">{`${t('bluiRegistration:SELF_REGISTRATION.NEW_ORG.MESSAGE_3')}`}</Typography>
        </Box>
    );

    const onNext = useCallback(async () => {
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
    }, [actions, organizationNameInputValue, nextScreen, triggerError]);

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
            return 'Please enter a valid organization name';
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
        instructions: <NewOrgInstructions />,
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
            orgNameLabel={orgNameLabel}
            initialValue={initialValue || ''}
            orgNameTextFieldProps={{ ...orgNameTextFieldProps, onChange: onOrganizationNameInputValueChange }}
            orgNameValidator={orgNameValidator}
            WorkflowCardActionsProps={workflowCardActionsProps}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
