import React, { useEffect, useRef, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AccountDetailsFormProps } from '@brightlayer-ui/react-auth-workflow';

export const TextFieldStyles = (theme: Theme) => ({
    mt: 4,
    [theme.breakpoints.down('sm')]: {
        mt: 3,
    },
});

export const CustomDetailsScreen: React.FC<React.PropsWithChildren<AccountDetailsFormProps>> = (props) => {
    const { onDetailsChanged, initialDetails, onSubmit } = props;
    const [country, setCountry] = useState(initialDetails ? initialDetails.country : '');
    const [currency, setCurrency] = useState(initialDetails ? initialDetails.currency : '');

    const countryRef = useRef<any>(null);
    const currencyRef = useRef<any>(null);
    const theme = useTheme();

    useEffect((): void => {
        // validation checks
        const valid = country !== '';
        onDetailsChanged({ country, currency }, valid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, country]); // Do NOT include onDetailsChanged in the dependencies array here or you will run into an infinite loop of updates

    return (
        <>
            <TextField
                fullWidth
                variant={'filled'}
                inputRef={countryRef}
                label={'Country'}
                value={country}
                placeholder={'Enter your favorite country'}
                onChange={(evt): void => setCountry(evt.target.value)}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && currencyRef.current) currencyRef.current.focus();
                }}
            />
            <TextField
                fullWidth
                variant={'filled'}
                inputRef={currencyRef}
                label={'Currency (Optional)'}
                value={currency}
                placeholder={'Enter your favorite currency'}
                sx={TextFieldStyles(theme)}
                onChange={(evt): void => setCurrency(evt.target.value)}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
            />
        </>
    );
};

export const CustomDetailsScreenTwo: React.FC<React.PropsWithChildren<AccountDetailsFormProps>> = (props) => {
    const { onDetailsChanged, initialDetails, onSubmit } = props;
    const [company, setCompany] = useState(initialDetails ? initialDetails.company : '');
    const [role, setRole] = useState(initialDetails ? initialDetails.role : '');
    const theme = useTheme();

    const companyRef = useRef<any>(null);
    const roleRef = useRef<any>(null);

    useEffect((): void => {
        onDetailsChanged({ company, role }, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role, company]); // Do NOT include onDetailsChanged in the dependencies array here or you will run into an infinite loop of updates

    return (
        <>
            <TextField
                fullWidth
                variant={'filled'}
                inputRef={companyRef}
                label={'Company'}
                value={company}
                placeholder={'Where do you work?'}
                onChange={(evt): void => setCompany(evt.target.value)}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && roleRef.current) roleRef.current.focus();
                }}
            />
            <TextField
                fullWidth
                variant={'filled'}
                inputRef={roleRef}
                label={'Job Title'}
                value={role}
                placeholder={'Enter your job title'}
                sx={TextFieldStyles(theme)}
                onChange={(evt): void => setRole(evt.target.value)}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
            />
        </>
    );
};
