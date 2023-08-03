import React from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    useRegistrationWorkflowContext,
} from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@brightlayer-ui/react-components';
import Event from '@mui/icons-material/Event';

export const CustomScreen: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen } = regWorkflow;

    return (
        <WorkflowCard>
            <WorkflowCardHeader title={'Custom Screen'} />
            <WorkflowCardBody>
                <EmptyState
                    icon={<Event fontSize={'inherit'} />}
                    title={`${t('TOOLBAR_MENU.HOME_PAGE')}`}
                    description={`${t('PAGE_DETAILS.AUTHORISED_MESSAGE')}`}
                />
            </WorkflowCardBody>
            <WorkflowCardActions
                showPrevious
                fullWidthButton
                previousLabel="Go to / route"
                onPrevious={(): void => navigate('/login')}
                showNext
                nextLabel="Next"
                onNext={() =>
                    nextScreen({
                        screenId: 'Custom',
                        values: { custom: true },
                    })
                }
            />
        </WorkflowCard>
    );
};
