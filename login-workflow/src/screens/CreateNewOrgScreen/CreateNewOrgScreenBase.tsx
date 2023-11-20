import React, { useCallback, useEffect } from 'react';
import { CreateNewOrgScreenProps } from './types';
import TextField from '@mui/material/TextField';
import ErrorManager from '../../components/Error/ErrorManager';
import {
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardInstructions,
    WorkflowCardBody,
    WorkflowCardActions,
} from '../../components';

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

export const CreateNewOrgScreenBase: React.FC<React.PropsWithChildren<CreateNewOrgScreenProps & { inputRef?: any }>> = (
    props
) => {
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        orgNameValidator = (orgName: string): boolean | string => true,
        orgNameLabel,
        initialValue,
        orgNameTextFieldProps,
        inputRef,
        errorDisplayConfig,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [orgNameInput, setOrgNameInput] = React.useState(initialValue ? initialValue : '');
    const [isOrgNameValid, setIsOrgNameValid] = React.useState(orgNameValidator(initialValue ?? '') ?? false);
    const [orgNameError, setOrgNameError] = React.useState('');
    const [shouldValidateOrgName, setShouldValidateOrgName] = React.useState(false);

    const handleOrgNameInputChange = useCallback(
        (orgName: string) => {
            setOrgNameInput(orgName);
            const orgNameValidatorResponse = orgNameValidator(orgName);

            setIsOrgNameValid(typeof orgNameValidatorResponse === 'boolean' ? orgNameValidatorResponse : false);
            setOrgNameError(typeof orgNameValidatorResponse === 'string' ? orgNameValidatorResponse : '');
        },
        [orgNameValidator]
    );
    useEffect(() => {
        if (orgNameInput.length > 0) {
            setShouldValidateOrgName(true);
            handleOrgNameInputChange(orgNameInput);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardInstructions {...instructionsProps} />
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <TextField
                        ref={inputRef}
                        type={'orgName'}
                        label={orgNameLabel}
                        fullWidth
                        value={orgNameInput}
                        variant="filled"
                        error={shouldValidateOrgName && !isOrgNameValid}
                        helperText={shouldValidateOrgName && orgNameError}
                        {...orgNameTextFieldProps}
                        onChange={(e): void => {
                            orgNameTextFieldProps?.onChange?.(e);
                            handleOrgNameInputChange(e.target.value);
                        }}
                        onKeyUp={(e): void => {
                            if (
                                e.key === 'Enter' &&
                                ((orgNameInput.length > 0 && isOrgNameValid) || actionsProps.canGoNext)
                            )
                                actionsProps?.onNext?.();
                        }}
                        onBlur={(e): void => {
                            orgNameTextFieldProps?.onBlur?.(e);
                            setShouldValidateOrgName(true);
                        }}
                    />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                canGoNext={(orgNameInput.length > 0 && isOrgNameValid && actionsProps.canGoNext) as any}
            />
        </WorkflowCard>
    );
};
