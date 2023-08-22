import React, { useCallback, useState } from 'react';
import { EulaScreenProps } from './types';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components/WorkflowCard';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import DOMPurify from 'dompurify';
import ErrorManager from '../../components/Error/ErrorManager';
import { IconButton, Typography } from '@mui/material';
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';

/**
 * Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param eulaContent the content to render for the EULA. Can be a plain string or HTML
 * @param htmlEula true if the EULA should be rendered as HTML
 * @param checkboxLabel label for the EULA checkbox
 * @param initialCheckboxValue used to pre-populate the checked/unchecked checkbox when the screen loads
 * @param checkboxProps used to set checkbox props
 * @category Component
 */

export const EulaScreenBase: React.FC<EulaScreenProps> = (props) => {
    const {
        onEulaAcceptedChange = (accepted: boolean): boolean => accepted,
        eulaContent,
        checkboxLabel,
        htmlEula,
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
                {checkboxProps.disabled ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <IconButton onClick={onRefetch}>
                            <ReplaySharpIcon color="primary" sx={{ width: 64, height: 64 }} />
                        </IconButton>
                        <Typography
                            onClick={onRefetch}
                            color="primary"
                            fontSize="30px"
                            display="block"
                            fontWeight={600}
                            sx={{ cursor: 'pointer' }}
                        >
                            Retry
                        </Typography>
                    </Box>
                ) : htmlEula ? (
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
