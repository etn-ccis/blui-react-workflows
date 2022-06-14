import React, { useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useLanguageLocale, AccountDetailInformation, useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import { useTheme } from '@mui/material/styles';
import { FullDividerStyles, TextFieldStyles } from '../../styles';

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
export const AccountDetailsWrapper: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<AccountDetailsWrapperProps>>
> = (props) => {
    const { t } = useLanguageLocale();
    const { description = t('blui:REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS') } = props;
    const theme = useTheme();

    return (
        <>
            <Typography>{description}</Typography>
            <Divider sx={FullDividerStyles} />
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
export const AccountDetails: React.FC<React.PropsWithChildren<React.PropsWithChildren<AccountDetailsProps>>> = (
    props
) => {
    const { onDetailsChanged, initialDetails, onSubmit } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();

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
                sx={TextFieldStyles(theme)}
                inputProps={{ maxLength: lastNameLengthLimit }}
            />
        </>
    );
};
