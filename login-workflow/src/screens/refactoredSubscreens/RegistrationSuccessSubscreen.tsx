import React from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import { Trans } from 'react-i18next';
import { BrandedCardContainer, BrandedCardContainerProps, FinishState } from '../../components';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';

export type RegistrationSuccessSubscreenProps = BrandedCardContainerProps & {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    messageIcon?: JSX.Element;
    messageTitle?: string;
    messageBody?: string;
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
export const RegistrationSuccessSubscreen: React.FC<RegistrationSuccessSubscreenProps> = (props) => {
    const { t } = useLanguageLocale();

    const {
        firstName,
        lastName,
        email,
        organization,
        messageIcon = <CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 2 }} />,
        messageTitle = `${t('blui:MESSAGES.WELCOME')}, ${firstName} ${lastName}!`,
        messageBody = 'blui:REGISTRATION.SUCCESS_MESSAGE_ALT',
    } = props;

    const finishState = (
        <FinishState
            icon={messageIcon}
            title={messageTitle}
            description={
                <Typography variant="subtitle2">
                    <Trans i18nKey={messageBody} values={{ email: email, organization: organization }}>
                        Your account has successfully been created with the email <b>{email}</b> belonging to the
                        <b>{` ${organization}`}</b> org.
                    </Trans>
                </Typography>
            }
        />
    );

    return <BrandedCardContainer>{finishState}</BrandedCardContainer>;
};
