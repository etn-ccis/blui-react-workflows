import React from 'react';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { CheckCircle } from '@material-ui/icons';
import { Trans } from 'react-i18next';
import { FinishState } from '../../components';

export type RegistrationCompleteProps = {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
};
export const RegistrationComplete: React.FC<RegistrationCompleteProps> = (props) => {
    const { firstName, lastName, email, organization } = props;
    const { t } = useLanguageLocale();

    return (
        <div
            style={{ display: 'flex', flex: '1 1 0%', justifyContent: 'center', height: '100%' }}
            data-testid="reset-password-confirmation-content"
        >
            <FinishState
                icon={<CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: 16 }} />}
                title={`${t('MESSAGES.WELCOME')}, ${firstName} ${lastName}!`}
                description={
                    <Trans
                        i18nKey={'REGISTRATION.SUCCESS_MESSAGE_ALT'}
                        values={{ email: email, organization: organization }}
                    >
                        Your account has successfully been created with the email <b>{email}</b> belonging to the{' '}
                        <b>{organization}</b> org.
                    </Trans>
                }
            />
        </div>
    );
};
