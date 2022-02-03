import React from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import { Trans } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import { FinishState } from '../../components';
import CheckCircle from '@material-ui/icons/CheckCircle';

export type RegistrationCompleteProps = {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
};

/**
 * Component that renders a screen displaying success for creating an account for
 * a new user.
 *
 * @param firstName first name for the new user
 * @param lastName last name for the new user
 * @param email email address for the new user
 * @param organization organization that the user has joined
 *
 * @category Component
 */
export const RegistrationComplete: React.FC<RegistrationCompleteProps> = (props) => {
    const { firstName, lastName, email, organization } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();

    return (
        <FinishState
            icon={<CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
            title={`${t('blui:MESSAGES.WELCOME')}, ${firstName} ${lastName}!`}
            description={
                <Trans
                    i18nKey={'blui:REGISTRATION.SUCCESS_MESSAGE_ALT'}
                    values={{ email: email, organization: organization }}
                >
                    Your account has successfully been created with the email <b>{email}</b> belonging to the{' '}
                    <b>{organization}</b> org.
                </Trans>
            }
        />
    );
};
