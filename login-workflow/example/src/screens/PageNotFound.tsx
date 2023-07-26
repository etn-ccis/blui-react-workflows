import React from 'react';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody } from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@brightlayer-ui/react-components';
import ErrorIcon from '@mui/icons-material/Error';

export const PageNotFound: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <WorkflowCard>
            <WorkflowCardBody>
                <EmptyState icon={<ErrorIcon fontSize={'inherit'} />} title={`${t('ERROR_PAGE:PAGE_NOT_FOUND')}`} />
            </WorkflowCardBody>
            <WorkflowCardActions
                showPrevious
                fullWidthButton
                previousLabel="Go to Login"
                onPrevious={(): void => navigate('/login')}
            />
        </WorkflowCard>
    );
};
