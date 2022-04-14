import React from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import { useTheme } from '@mui/material/styles';
import { FinishState } from '../../components';
import Person from '@mui/icons-material/Person';

/**
 * Component that renders a screen displaying success for creating an account for
 * a user that already exists.
 *
 * @category Component
 */
export const ExistingAccountComplete: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = () => {
    const { t } = useLanguageLocale();
    const theme = useTheme();

    return (
        <FinishState
            icon={<Person color={'primary'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
            title={t('blui:MESSAGES.WELCOME')}
            description={t('blui:REGISTRATION.SUCCESS_EXISTING')}
        />
    );
};
