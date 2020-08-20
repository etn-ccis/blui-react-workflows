import React from 'react';
import { TextField, Typography, Divider, useTheme } from '@material-ui/core';
import { useLanguageLocale, AccountDetailInformation } from '@pxblue/react-auth-shared';

export type AccountDetailsProps = {
    onDetailsChanged: (details: AccountDetailInformation | null) => void;
    initialDetails?: AccountDetailInformation;
};
export const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
    const { onDetailsChanged, initialDetails } = props;
    const theme = useTheme();
    const { t } = useLanguageLocale();

    const [firstNameInput, setFirstNameInput] = React.useState(initialDetails ? initialDetails.firstName : '');
    const [lastNameInput, setLastNameInput] = React.useState(initialDetails ? initialDetails.lastName : '');
    const [phoneInput, setPhoneInput] = React.useState(initialDetails ? initialDetails.phone : '');

    React.useEffect((): void => {
        onDetailsChanged({ firstName: firstNameInput, lastName: lastNameInput, phone: phoneInput });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstNameInput, lastNameInput, phoneInput]); // ignore props

    return (
        <>
            <Typography>{t('REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS')}</Typography>
            <Divider style={{ margin: '32px 0' }} />
            <TextField
                label={t('FORMS.FIRST_NAME')}
                fullWidth
                value={firstNameInput}
                onChange={(evt): void => {
                    setFirstNameInput(evt.target.value);
                }}
                variant="filled"
            />
            <TextField
                label={t('FORMS.LAST_NAME')}
                fullWidth
                value={lastNameInput}
                onChange={(evt): void => {
                    setLastNameInput(evt.target.value);
                }}
                variant="filled"
                style={{ marginTop: theme.spacing(2) }}
            />
            <TextField
                label={`${t('FORMS.PHONE_NUMBER')} (${t('LABELS.OPTIONAL')})`}
                fullWidth
                value={phoneInput}
                onChange={(evt): void => {
                    setPhoneInput(evt.target.value);
                }}
                variant="filled"
                style={{ marginTop: theme.spacing(2) }}
            />
        </>
    );
};
