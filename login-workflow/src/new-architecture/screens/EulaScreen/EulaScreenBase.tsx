/** eslint-ignore */
import React, { useCallback } from 'react';
import { EulaScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardActions } from '../../components/WorkflowCard/WorkflowCardActions';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { WorkflowCardHeader } from '../../components/WorkflowCard/WorkflowCardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

/**
 * Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param eulaContent the content to render for the EULA. Can be a plain string or HTML
 * @param htmlEula true if the EULA should be rendered as HTML
 * @param checkboxLabel label for the EULA checkbox
 * @param initialCheckboxValue used to pre-populate the checked/unchecked checkbox when the screen loads
 * @category Component
 */

export const EulaScreenBase: React.FC<React.PropsWithChildren<EulaScreenProps>> = (props) => {
    const {
        onEulaAcceptedChange = (accepted: boolean): boolean => (accepted),
        eulaContent,
        checkboxLabel,
        htmlEula,
        initialCheckboxValue,
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

    const [eulaAccepted, setEulaAccepted] = React.useState(onEulaAcceptedChange(initialCheckboxValue) ?? false);

    const handleEulaAcceptedChecked = useCallback(
        (accepted: boolean) => {
            setEulaAccepted(onEulaAcceptedChange(accepted))
        },
        [onEulaAcceptedChange]
    );
    
    return (
        <WorkflowCard>
            <WorkflowCardHeader title={title}></WorkflowCardHeader>
            <WorkflowCardBody>
                <Box
                    sx={{ flex: '1 1 0px', overflow: 'auto' }}
                >
                    {eulaContent}
                </Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            color={'primary'}
                            checked={eulaAccepted}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                                handleEulaAcceptedChecked(event.target.checked)
                            }
                        />
                    }
                    label={checkboxLabel}
                    sx={{ flex: '0 0 auto', mr: 0, mt: 2 }}
                />
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} divider></WorkflowCardActions>
        </WorkflowCard>
    );
};
