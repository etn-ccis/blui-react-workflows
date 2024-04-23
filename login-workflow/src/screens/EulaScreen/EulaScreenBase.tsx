import React, { useCallback, useState } from 'react';
import { EulaScreenProps } from './types';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import DOMPurify from 'dompurify';
import ErrorManager from '../../components/Error/ErrorManager';
import { Typography } from '@mui/material';
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
import { useTranslation } from 'react-i18next';

/**
 * Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param {EulaScreenProps} props - props of eulaScreen
 *
 * @category Component
 */

export const EulaScreenBase: React.FC<EulaScreenProps> = (props) => {
    const {
        onEulaAcceptedChange,
        eulaContent,
        checkboxLabel,
        html,
        initialCheckboxValue,
        checkboxProps,
        errorDisplayConfig,
        refreshConfig,
    } = props;

    const { t } = useTranslation();
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [eulaAccepted, setEulaAccepted] = useState(initialCheckboxValue ?? false);

    const handleEulaAcceptedChecked = useCallback(
        (accepted: boolean) => {
            setEulaAccepted(accepted);
            onEulaAcceptedChange?.(accepted);
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
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody sx={{ pt: 2 }}>
                {refreshConfig?.showRefreshButton ? (
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
                            onClick={refreshConfig?.onRefresh}
                        >
                            <ReplaySharpIcon color="primary" sx={{ width: 36, height: 36 }} />
                            <Typography variant="subtitle2" color="primary">
                                {refreshConfig?.refreshButtonLabel || t('bluiCommon:MESSAGES.RETRY')}
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
            <WorkflowCardActions {...actionsProps} canGoNext={eulaAccepted && actionsProps.canGoNext} />
        </WorkflowCard>
    );
};
