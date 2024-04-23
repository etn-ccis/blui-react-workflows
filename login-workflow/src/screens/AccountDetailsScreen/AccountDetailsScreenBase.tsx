import React, { useCallback, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import { AccountDetailsScreenProps } from './types';
import ErrorManager from '../../components/Error/ErrorManager';

/**
 * Component renders a screen with account details information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param {AccountDetailsScreenProps} props - props of accountDetailsScreen
 *
 * @category Component
 */

export const AccountDetailsScreenBase: React.FC<AccountDetailsScreenProps> = (props) => {
    const {
        firstNameLabel,
        initialFirstName,
        firstNameValidator = (): void => {},
        firstNameTextFieldProps,
        lastNameLabel,
        initialLastName,
        lastNameValidator = (): void => {},
        lastNameTextFieldProps,
        errorDisplayConfig,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const firstNameRef = useRef<any>(null);
    const lastNameRef = useRef<any>(null);

    const [firstNameInput, setFirstNameInput] = React.useState(initialFirstName ? initialFirstName : '');
    const [lastNameInput, setLastNameInput] = React.useState(initialLastName ? initialLastName : '');

    const [isFirstNameValid, setIsFirstNameValid] = React.useState(false);
    const [isLastNameValid, setIsLastNameValid] = React.useState(false);

    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');

    const [shouldValidateFirstName, setShouldValidateFirstName] = React.useState(false);
    const [shouldValidateLastName, setShouldValidateLastName] = React.useState(false);

    const handleFirstNameInputChange = useCallback(
        (firstName: string) => {
            setFirstNameInput(firstName);
            const firstNameValidatorResponse = firstNameValidator(firstName);

            setIsFirstNameValid(typeof firstNameValidatorResponse === 'boolean' ? firstNameValidatorResponse : false);
            setFirstNameError(typeof firstNameValidatorResponse === 'string' ? firstNameValidatorResponse : '');
        },
        [firstNameValidator]
    );

    const handleLastNameInputChange = useCallback(
        (lastName: string) => {
            setLastNameInput(lastName);
            const lastNameValidatorResponse = lastNameValidator(lastName);

            setIsLastNameValid(typeof lastNameValidatorResponse === 'boolean' ? lastNameValidatorResponse : false);
            setLastNameError(typeof lastNameValidatorResponse === 'string' ? lastNameValidatorResponse : '');
        },
        [lastNameValidator]
    );

    useEffect(() => {
        if (firstNameInput.length > 0) {
            setShouldValidateFirstName(true);
            handleFirstNameInputChange(firstNameInput);
        }
        if (lastNameInput.length > 0) {
            setShouldValidateLastName(true);
            handleLastNameInputChange(lastNameInput);
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
                        id="first"
                        fullWidth
                        variant="filled"
                        inputRef={firstNameRef}
                        label={firstNameLabel}
                        value={firstNameInput}
                        error={shouldValidateFirstName && !isFirstNameValid}
                        helperText={shouldValidateFirstName && firstNameError}
                        sx={{
                            mb: { md: 0, sm: 1, xs: 4 },
                        }}
                        {...firstNameTextFieldProps}
                        onChange={(e): void => {
                            // eslint-disable-next-line no-unused-expressions
                            firstNameTextFieldProps?.onChange && firstNameTextFieldProps.onChange(e);
                            handleFirstNameInputChange(e.target.value);
                        }}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && lastNameRef.current) lastNameRef.current.focus();
                        }}
                        onBlur={(): void => setShouldValidateFirstName(true)}
                    />
                    <TextField
                        id="last"
                        fullWidth
                        variant="filled"
                        sx={{
                            mt: { md: 4, sm: 3 },
                        }}
                        inputRef={lastNameRef}
                        label={lastNameLabel}
                        value={lastNameInput}
                        error={shouldValidateLastName && !isLastNameValid}
                        helperText={shouldValidateLastName && lastNameError}
                        {...lastNameTextFieldProps}
                        onChange={(e): void => {
                            // eslint-disable-next-line no-unused-expressions
                            lastNameTextFieldProps?.onChange && lastNameTextFieldProps.onChange(e);
                            handleLastNameInputChange(e.target.value);
                        }}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && isFirstNameValid && isLastNameValid && actionsProps.canGoNext)
                                actionsProps.onNext?.();
                        }}
                        onBlur={(): void => setShouldValidateLastName(true)}
                    />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                canGoNext={actionsProps.canGoNext && isFirstNameValid && isLastNameValid}
            />
        </WorkflowCard>
    );
};
