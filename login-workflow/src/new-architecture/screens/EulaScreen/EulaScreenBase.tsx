/** eslint-ignore */
import React, { useCallback, useState } from 'react';
import { EulaScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardActions } from '../../components/WorkflowCard/WorkflowCardActions';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { WorkflowCardHeader } from '../../components/WorkflowCard/WorkflowCardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import DOMPurify from 'dompurify';

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

export const EulaScreenBase: React.FC<React.PropsWithChildren<EulaScreenProps>> = (props) => {
    const {
        onEulaAcceptedChange = (accepted: boolean): boolean => accepted,
        eulaContent,
        checkboxLabel,
        htmlEula,
        initialCheckboxValue,
        checkboxProps,
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

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps}></WorkflowCardHeader>
            <WorkflowCardBody>
                {!htmlEula && <Box sx={{ flex: '1 1 0px', overflow: 'auto' }}>{eulaContent}</Box>}
                {htmlEula && (
                    <Box
                        sx={{ flex: '1 1 0px', overflow: 'auto' }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eulaContent as string) }}
                    />
                )}
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
                />
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                divider
                canGoNext={eulaAccepted && actionsProps.canGoNext}
            ></WorkflowCardActions>
        </WorkflowCard>
    );
};
