import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import { AccountDetailsScreenProps } from './types';

export const AccountDetailsScreenBase: React.FC<AccountDetailsScreenProps> = (props) => {
    const {
        firstNameLabel,
        initialFirstName,
        firstNameValidator,
        firstNameTextFieldProps,
        lastNameLabel,
        initialLastName,
        lastNameValidator,
        lastNameTextFieldProps,
        title,
        instructions,
        ...otherProps
    } = props;

    const actionsProps = {
        divider: otherProps.divider,
        canGoNext: otherProps.canGoNext,
        canGoPrevious: otherProps.canGoPrevious,
        showPrevious: otherProps.showPrevious,
        showNext: otherProps.showNext,
        previousLabel: otherProps.previousLabel,
        nextLabel: otherProps.nextLabel,
        onPrevious: otherProps.onPrevious,
        onNext: otherProps.onNext,
        currentStep: otherProps.currentStep,
        totalSteps: otherProps.totalSteps,
        fullWidthButton: otherProps.fullWidthButton,
        // @TODO: should we extend the rest of the props (CardActionsProps) or should we set this up to take in each sections props separately e.g., workflowCardProps, actionsProps, etc.
    };

    const firstRef = useRef<any>(null);
    const lastRef = useRef<any>(null);

    const [firstNameInput, setFirstNameInput] = React.useState(initialFirstName ? initialFirstName : '');
    const [lastNameInput, setLastNameInput] = React.useState(initialLastName ? initialLastName : '');

    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');

    const [showFirstNameError, setShowFirstNameError] = React.useState(false);
    const [showLastNameError, setShowLastNameError] = React.useState(false);

    return (
        <WorkflowCard>
            <WorkflowCardHeader title={title} />
            <WorkflowCardBody>
                <WorkflowCardInstructions instructions={instructions} divider />
                <TextField
                    id="first"
                    fullWidth
                    variant="filled"
                    {...firstNameTextFieldProps}
                    inputRef={firstRef}
                    label={firstNameLabel}
                    value={firstNameInput}
                    onChange={(evt): void => {
                        setFirstNameInput(evt.target.value);
                        if (firstNameValidator(evt.target.value)) {
                            setFirstNameError('Please enter a valid First Name');
                            setShowFirstNameError(true);
                        } else {
                            setFirstNameError('');
                            setShowFirstNameError(false);
                        }
                    }}
                    onKeyPress={(e): void => {
                        if (e.key === 'Enter' && lastRef.current) lastRef.current.focus();
                    }}
                    error={showFirstNameError}
                    helperText={firstNameError}
                />
                <TextField
                    id="last"
                    fullWidth
                    variant="filled"
                    sx={{
                        mt: { md: 4, sm: 3 },
                    }}
                    {...lastNameTextFieldProps}
                    inputRef={lastRef}
                    label={lastNameLabel}
                    value={lastNameInput}
                    onChange={(evt): void => {
                        setLastNameInput(evt.target.value);
                        if (lastNameValidator(evt.target.value)) {
                            setLastNameError('Please enter a valid Last Name');
                            setShowLastNameError(true);
                        } else {
                            setLastNameError('');
                            setShowLastNameError(false);
                        }
                    }}
                    onKeyPress={(e): void => {
                        // if (e.key === 'Enter' && onSubmit) onSubmit();
                    }}
                    error={showLastNameError}
                    helperText={lastNameError}
                />
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} divider />
        </WorkflowCard>
    );
};
