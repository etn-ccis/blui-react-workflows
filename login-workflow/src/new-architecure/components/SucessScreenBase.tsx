import React from 'react';
import { Divider } from '@mui/material';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from './workflow';
import { WorkflowCardBaseProps } from './workflow/WorkflowCard.types';
import { FinishState } from '../../components';

// WorkflowCardBaseProps = loading, background, error
type SuccessScreenProps = WorkflowCardBaseProps & {
    title?: string;
    icon?: JSX.Element;
    successMessageTitle?: string;
    successMessage?: string;
    dismissButtonLabel?: string;
    onDismiss?: () => void;
};

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const { title, icon, successMessageTitle, successMessage, dismissButtonLabel, onDismiss } = props;
    return (
        <WorkflowCard>
            <WorkflowCardHeader title={title} />
            <WorkflowCardBody>
                {/* <WorkflowCardInstructions instructions={successMessage} /> */}
                <FinishState icon={icon} title={successMessageTitle} description={successMessage} />
            </WorkflowCardBody>
            <Divider />
            <WorkflowCardActions
                canGoNext={true}
                showNext={true}
                nextLabel={dismissButtonLabel}
                onNext={onDismiss}
                fullWidthButton={true}
            />
        </WorkflowCard>
    );
};
