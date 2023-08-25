import React, { useCallback, useState } from 'react';
import { EulaScreenProps } from './types';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components/WorkflowCard';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import DOMPurify from 'dompurify';
import ErrorManager from '../../components/Error/ErrorManager';
import { Typography } from '@mui/material';
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';

/**
 * Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param eulaContent the content to render for the EULA. Can be a plain string or HTML
 * @param html true if the EULA should be rendered as HTML
 * @param checkboxLabel label for the EULA checkbox
 * @param initialCheckboxValue used to pre-populate the checked/unchecked checkbox when the screen loads
 * @param checkboxProps used to set checkbox props
 * @param onEulaAcceptedChange used to test eula checkbox accepted
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 *
 * @category Component
 */

export const EulaScreenBase: React.FC<EulaScreenProps> = (props) => {
    const {
        onEulaAcceptedChange = (accepted: boolean): boolean => accepted,
        eulaContent,
        checkboxLabel,
        html,
        initialCheckboxValue,
        checkboxProps,
        errorDisplayConfig,
        onRefetch,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [eulaAccepted, setEulaAccepted] = useState(onEulaAcceptedChange(initialCheckboxValue) ?? false);

    const handleEulaAcceptedChecked = useCallback(
        (accepted: boolean) => {
            setEulaAccepted(onEulaAcceptedChange(accepted));
        },
        [onEulaAcceptedChange]
    );

    const handleOnNext = (): void => {
        const { onNext } = actionsProps;
        if (onNext) onNext({ accepted: eulaAccepted });
    };

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody>
                {checkboxProps?.disabled ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                p: 1,
                            }}
                            onClick={onRefetch}
                        >
                            <ReplaySharpIcon color="primary" sx={{ width: 36, height: 36 }} />
                            <Typography variant="subtitle2" color="primary">
                                Retry
                            </Typography>
                        </Box>
                    </Box>
                ) : html ? (
                    <Box
                        sx={{ flex: '1 1 0', overflow: 'auto' }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eulaContent as string) }}
                    />
                ) : (
                    <Box sx={{ flex: '1 1 0', overflow: 'auto' }}>{eulaContent}</Box>
                )}
                <ErrorManager {...errorDisplayConfig}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color={'primary'}
                                checked={eulaAccepted}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                                    handleEulaAcceptedChecked(event.target.checked)
                                }
                                {...checkboxProps}
                            />
                        }
                        label={checkboxLabel}
                        sx={{ flex: '0 0 auto', mr: 0, mt: 2 }}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && eulaAccepted) handleOnNext();
                        }}
                    />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions divider {...actionsProps} canGoNext={eulaAccepted && actionsProps.canGoNext} />
        </WorkflowCard>
    );
};
