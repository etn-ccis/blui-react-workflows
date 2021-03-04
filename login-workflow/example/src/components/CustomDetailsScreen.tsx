import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '@material-ui/core';
import { AccountDetailsFormProps } from '@pxblue/react-auth-workflow';

export const CustomDetailsScreen: React.FC<AccountDetailsFormProps> = (props) => {
    const { onDetailsChanged, initialDetails, onSubmit } = props;
    const [country, setCountry] = useState(initialDetails ? initialDetails.country : '');
    const [currency, setCurrency] = useState(initialDetails ? initialDetails.currency : '');

    const countryRef = useRef<any>(null);
    const currencyRef = useRef<any>(null);

    useEffect((): void => {
        // validation checks
        const valid = country !== '';
        onDetailsChanged({ country, currency }, valid);
    }, [currency, country]); // Do NOT include onDetailsChanged in the dependencies array here or you will run into an infinite loop of updates

    return (
        <>
            <TextField
                inputRef={countryRef}
                label={'Country'}
                value={country}
                onChange={(evt) => setCountry(evt.target.value)}
                variant={'filled'}
                placeholder={'Enter your favorite country'}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && currencyRef.current) currencyRef.current.focus();
                }}
            />
            <TextField
                inputRef={currencyRef}
                label={'Currency (Optional)'}
                value={currency}
                onChange={(evt) => setCurrency(evt.target.value)}
                variant={'filled'}
                placeholder={'Enter your favorite currency'}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
            />
        </>
    );
};

export const CustomDetailsScreenTwo: React.FC<AccountDetailsFormProps> = (props) => {
    const { onDetailsChanged, initialDetails, onSubmit } = props;
    const [company, setCompany] = useState(initialDetails ? initialDetails.company : '');
    const [role, setRole] = useState(initialDetails ? initialDetails.role : '');

    const companyRef = useRef<any>(null);
    const roleRef = useRef<any>(null);

    useEffect((): void => {
        onDetailsChanged({ company, role }, true);
    }, [role, company]); // Do NOT include onDetailsChanged in the dependencies array here or you will run into an infinite loop of updates

    return (
        <>
            <TextField
                inputRef={companyRef}
                label={'Company'}
                value={company}
                onChange={(evt) => setCompany(evt.target.value)}
                variant={'filled'}
                placeholder={'Where do you work?'}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && roleRef.current) roleRef.current.focus();
                }}
            />
            <TextField
                inputRef={roleRef}
                label={'Job Title'}
                value={role}
                onChange={(evt) => setRole(evt.target.value)}
                variant={'filled'}
                placeholder={'Enter your job title'}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
            />
        </>
    );
};
