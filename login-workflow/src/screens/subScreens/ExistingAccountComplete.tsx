import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { EmptyState } from '@pxblue/react-components';
import { Person } from '@material-ui/icons';

const useStyles = makeStyles(() =>
    createStyles({
        description: {
            color: 'inherit',
        },
    })
);

export const ExistingAccountComplete: React.FC = () => {
    const classes = useStyles();
    const { t } = useLanguageLocale();

    return (
        <div style={{ display: 'flex', flex: '1 1 0%', justifyContent: 'center', height: '100%' }}>
            <EmptyState
                icon={<Person color={'primary'} style={{ fontSize: 100, marginBottom: 16 }} />}
                title={t('MESSAGES.WELCOME')}
                description={t('REGISTRATION.SUCCESS_EXISTING')}
                classes={{
                    description: classes.description,
                }}
            />
        </div>
    );
};
