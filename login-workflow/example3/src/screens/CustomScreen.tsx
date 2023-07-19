import React from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
} from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@brightlayer-ui/react-components';
import Event from '@mui/icons-material/Event';

export const CustomScreen: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

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
            />
        </WorkflowCard>
    );
};
