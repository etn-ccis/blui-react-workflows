import React, { useEffect, useState } from 'react';
import { OrganizationDetailsScreenBase } from '@brightlayer-ui/react-auth-workflow';
import { stateList } from './country-state';

export type StateType = {
    name: string;
    isoCode: string;
    countryCode: string;
};

const countryList = [
    {
        name: 'Afghanistan',
        isoCode: 'AF',
        flag: '🇦🇫',
        phonecode: '93',
        currency: 'AFN',
    },
    {
        name: 'Aland Islands',
        isoCode: 'AX',
        flag: '🇦🇽',
        phonecode: '+358-18',
        currency: 'EUR',
    },
    {
        name: 'Albania',
        isoCode: 'AL',
        flag: '🇦🇱',
        phonecode: '355',
        currency: 'ALL',
    },
    {
        name: 'Algeria',
        isoCode: 'DZ',
        flag: '🇩🇿',
        phonecode: '213',
        currency: 'DZD',
    },
    {
        name: 'American Samoa',
        isoCode: 'AS',
        flag: '🇦🇸',
        phonecode: '+1-684',
        currency: 'USD',
    },
    {
        name: 'United States',
        isoCode: 'US',
        flag: '🇺🇸',
        phonecode: '1',
    },
];

export const getStatesOfCountry = (countryCode = ''): StateType[] => {
    if (!countryCode) return [];
    const states = stateList.filter((value) => value.countryCode === countryCode);
    return states.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
};

export const OrganizationDetailsScreenBaseDemo: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<any>({ name: 'United States', id: 'US' });
    const [stateOptions, setStateOptions] = useState<Array<{ name: any; id: any }>>([]);
    const countryOptions = countryList.map((item: any) => ({ name: item.name, id: item.isoCode }));

    useEffect(() => {
        const statesOfSelectedCountry = getStatesOfCountry(selectedCountry.id);
        setStateOptions(statesOfSelectedCountry.map((item: any) => ({ name: item.name, id: item.isoCode })));
    }, [selectedCountry]);

    return (
        <OrganizationDetailsScreenBase
            WorkflowCardHeaderProps={{ title: 'Organization Details' }}
            WorkflowCardInstructionProps={{
                instructions: 'Enter your new organization details below to continue with account registration.',
            }}
            addressLabel="Address"
            addressValidator={(address: string): boolean | string => {
                if (address?.length > 0) {
                    return true;
                }
                return 'Please enter a valid address';
            }}
            address2Label="Address Line 2 (optional)"
            cityLabel="City"
            cityValidator={(city: string): boolean | string => {
                if (city?.length > 0) {
                    return true;
                }
                return 'Please enter a valid city';
            }}
            stateLabel="State"
            stateOptions={[
                {
                    name: '',
                    id: '',
                },
                ...stateOptions,
            ]}
            initialState={{ name: 'Pennsylvania', id: 'PA' }}
            stateValidator={(state: string): boolean | string => {
                if (state?.length > 0) {
                    return true;
                }
                return 'Please select a valid state';
            }}
            // stateTextFieldProps={{
            //     variant: 'outlined',
            // }}
            zipCodeLabel="Postal Code"
            zipCodeValidator={(zipCode: string): boolean | string => {
                if (zipCode?.length > 0) {
                    return true;
                }
                return 'Please enter a valid zip code';
            }}
            countryLabel="Country/Territory"
            countryOptions={countryOptions}
            initialCountry={selectedCountry}
            countryValidator={(country: string): boolean | string => {
                if (country?.length > 0) {
                    return true;
                }
                return 'Please select a valid country';
            }}
            countryTextFieldProps={{
                onChange: (country): void => {
                    setSelectedCountry(country);
                },
            }}
            WorkflowCardActionsProps={{
                onNext: (): void => {},
                showNext: true,
                nextLabel: 'Next',
                onPrevious: (): void => {},
                showPrevious: true,
                previousLabel: 'Back',
                canGoNext: true,
                currentStep: 1,
                totalSteps: 2,
            }}
        />
    );
};
