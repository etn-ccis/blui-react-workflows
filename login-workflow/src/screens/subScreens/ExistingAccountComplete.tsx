import React from 'react';
import { FinishState } from '../../components';
import Person from '@mui/icons-material/Person';
import { useLanguageLocale } from '../../auth-shared';

/**
 * Component that renders a screen displaying success for creating an account for
 * a user that already exists.
 *
 * @category Component
 */
export const ExistingAccountComplete: React.FC<React.PropsWithChildren<React.PropsWithChildren>> = () => {
    const { t } = useLanguageLocale();

    return (
        <FinishState
            icon={<Person color={'primary'} sx={{ fontSize: 100, mb: 2 }} />}
            title={t('blui:MESSAGES.WELCOME')}
            description={t('blui:REGISTRATION.SUCCESS_EXISTING')}
        />
    );
};
