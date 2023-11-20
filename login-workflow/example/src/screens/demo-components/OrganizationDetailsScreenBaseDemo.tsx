import React from 'react';
import { OrganizationDetailsScreenBase } from '@brightlayer-ui/react-auth-workflow';

const countryList = [
    {
        name: '',
        isoCode: '',
    },
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

const stateList = [
    {
        name: '',
        isoCode: '',
        countryCode: '',
    },
    {
        name: 'Ohio',
        isoCode: 'OH',
        countryCode: 'US',
    },
    {
        name: 'Oklahoma',
        isoCode: 'OK',
        countryCode: 'US',
    },
    {
        name: 'Oregon',
        isoCode: 'OR',
        countryCode: 'US',
    },
    {
        name: 'Pennsylvania',
        isoCode: 'PA',
        countryCode: 'US',
    },
];

const countryOptions = countryList.map((item: any) => ({ name: item.name, id: item.isoCode }));
const stateOptions = stateList.map((item: any) => ({ name: item.name, id: item.isoCode }));

export const OrganizationDetailsScreenBaseDemo: React.FC = () => (
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
        stateOptions={stateOptions}
        initialState={{ name: 'Pennsylvania', id: 'PA' }}
        stateValidator={(state: string): boolean | string => {
            if (state?.length > 0) {
                return true;
            }
            return 'Please select a valid state';
        }}
        zipCodeLabel="Postal Code"
        zipCodeValidator={(zipCode: string): boolean | string => {
            if (zipCode?.length > 0) {
                return true;
            }
            return 'Please enter a valid zip code';
        }}
        countryLabel="Country/Territory"
        countryOptions={countryOptions}
        initialCountry={{ name: 'United States', id: 'US' }}
        countryValidator={(country: string): boolean | string => {
            if (country?.length > 0) {
                return true;
            }
            return 'Please select a valid country';
        }}
        // countryTextFieldProps={{
        //     onChange: (country) => {
        //         console.log('country text field changed::', country);
        //     },
        // }}
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
