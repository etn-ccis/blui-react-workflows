import React, { useEffect, useRef } from 'react';
import { TextField, Typography, Divider } from '@material-ui/core';
import { useLanguageLocale, AccountDetailInformation, useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import { useDialogStyles } from '../../styles';

export type AccountDetailsWrapperProps = {
    description?: string;
};
export type AccountDetailsProps = {
    onDetailsChanged: (details: (AccountDetailInformation & { valid: boolean }) | null) => void;
    initialDetails?: AccountDetailInformation;
    onSubmit?: () => void;
};

/**
 * Component that wraps a form field with an optional description text.
 *
 * @param description an object specifying any details to pre-fill
 * @category Component
 */
export const AccountDetailsWrapper: React.FC<AccountDetailsWrapperProps> = (props) => {
    const { t } = useLanguageLocale();
    const { description = t('blui:REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS') } = props;
    const classes = useDialogStyles();

    return (
        <>
            <Typography>{description}</Typography>
            <Divider className={classes.fullDivider} />
            {props.children}
        </>
    );
};

/**
 * Component that renders a screen requesting user first and last name.
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

    const [firstNameInput, setFirstNameInput] = React.useState(initialDetails ? initialDetails.firstName : '');
    const [lastNameInput, setLastNameInput] = React.useState(initialDetails ? initialDetails.lastName : '');

    const firstNameLengthLimit = useInjectedUIContext()?.registrationConfig?.firstName?.maxLength || null;
    const lastNameLengthLimit = useInjectedUIContext()?.registrationConfig?.lastName?.maxLength || null;

    useEffect((): void => {
        // validation checks
        const valid = firstNameInput !== '' && lastNameInput !== '';
        onDetailsChanged({ firstName: firstNameInput, lastName: lastNameInput, valid });
    }, [onDetailsChanged, firstNameInput, lastNameInput]);

    return (
        <>
            <TextField
                inputRef={firstRef}
                id="first"
                label={t('blui:FORMS.FIRST_NAME')}
                fullWidth
                value={firstNameInput}
                onChange={(evt): void => {
                    setFirstNameInput(evt.target.value);
                }}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && lastRef.current) lastRef.current.focus();
                }}
                variant="filled"
                inputProps={{ maxLength: firstNameLengthLimit }}
            />
            <TextField
                inputRef={lastRef}
                id="last"
                label={t('blui:FORMS.LAST_NAME')}
                fullWidth
                value={lastNameInput}
                onChange={(evt): void => {
                    setLastNameInput(evt.target.value);
                }}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                variant="filled"
                className={classes.textField}
                inputProps={{ maxLength: lastNameLengthLimit }}
            />
        </>
    );
};
