import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { EmptyState } from '@pxblue/react-components';
import { CheckCircle } from '@material-ui/icons';
import { Trans } from 'react-i18next';

const useStyles = makeStyles(() =>
    createStyles({
        description: {
            color: 'inherit',
        },
    })
);

export type RegistrationCompleteProps = {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
};
export const RegistrationComplete: React.FC<RegistrationCompleteProps> = (props) => {
    const { firstName, lastName, email, organization } = props;
    const classes = useStyles();
    const { t } = useLanguageLocale();

    return (
        <div
            style={{ display: 'flex', flex: '1 1 0%', justifyContent: 'center', height: '100%' }}
            data-testid="reset-password-confirmation-content"
        >
            <EmptyState
                icon={<CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: 16 }} />}
                title={`${t('MESSAGES.WELCOME')}, ${firstName} ${lastName}!`}
                // description={t('REGISTRATION.SUCCESS_MESSAGE', {
                //     replace: { email: email, organization: organization },
                // })}
                description={
                    <Trans
                        i18nKey={'REGISTRATION.SUCCESS_MESSAGE_ALT'}
                        values={{ email: email, organization: organization }}
                    >
                        Your account has successfully been created with the email <b>{email}</b> belonging to the{' '}
                        <b>{organization}</b> org.
                    </Trans>
                }
                classes={{
                    description: classes.description,
                }}
            />
        </div>
    );
};
