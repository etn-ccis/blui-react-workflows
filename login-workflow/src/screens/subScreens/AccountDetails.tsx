import React, { useEffect, useRef } from 'react';
import { TextField, Typography, Divider } from '@material-ui/core';
import { useLanguageLocale, AccountDetailInformation } from '@pxblue/react-auth-shared';
import { useDialogStyles } from '../../styles';

export type AccountDetailsProps = {
    onDetailsChanged: (details: (AccountDetailInformation & { valid: boolean }) | null) => void;
    initialDetails?: AccountDetailInformation;
    onSubmit?: () => void;
};

/**
 * Component that renders a screen requesting user first and last name and optional phone number.
 *
 * @param initialDetails an object specifying any details to pre-fill
 * @param onDetailsChanged a function to call when any of the detail fields values change
 * @param onSubmit function to call when the user submits the mini form
 * @category Component
 */
export const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
    const { onDetailsChanged, initialDetails, onSubmit } = props;
    const classes = useDialogStyles();
    const { t } = useLanguageLocale();

    const firstRef = useRef<any>(null);
    const lastRef = useRef<any>(null);
    const phoneRef = useRef<any>(null);

    const [firstNameInput, setFirstNameInput] = React.useState(initialDetails ? initialDetails.firstName : '');
    const [lastNameInput, setLastNameInput] = React.useState(initialDetails ? initialDetails.lastName : '');
    const [phoneInput, setPhoneInput] = React.useState(initialDetails ? initialDetails.phone : '');

    useEffect((): void => {
        // validation checks
        const valid = firstNameInput !== '' && lastNameInput !== '';
        onDetailsChanged({ firstName: firstNameInput, lastName: lastNameInput, phone: phoneInput, valid });
    }, [onDetailsChanged, firstNameInput, lastNameInput, phoneInput]);

    return (
        <>
            <Typography>{t('REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS')}</Typography>
            <Divider className={classes.fullDivider} />
            <TextField
                inputRef={firstRef}
                id="first"
                label={t('FORMS.FIRST_NAME')}
                fullWidth
                value={firstNameInput}
                onChange={(evt): void => {
                    setFirstNameInput(evt.target.value);
                }}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && lastRef.current) lastRef.current.focus();
                }}
                variant="filled"
            />
            <TextField
                inputRef={lastRef}
                id="last"
                label={t('FORMS.LAST_NAME')}
                fullWidth
                value={lastNameInput}
                onChange={(evt): void => {
                    setLastNameInput(evt.target.value);
                }}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && phoneRef.current) phoneRef.current.focus();
                }}
                variant="filled"
                className={classes.textField}
            />
            <TextField
                inputRef={phoneRef}
                id="phone"
                label={`${t('FORMS.PHONE_NUMBER')} (${t('LABELS.OPTIONAL')})`}
                fullWidth
                value={phoneInput}
                onChange={(evt): void => {
                    setPhoneInput(evt.target.value);
                }}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                variant="filled"
                className={classes.textField}
            />
        </>
    );
};
