import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { OrganizationDetailsScreenBase } from './OrganizationDetailsScreenBase';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('OrganizationDetailsScreenBase', () => {
    const mockProps = {
        addressLabel: 'Address',
        initialAddress: '123 Main St',
        addressValidator: jest.fn(),
        address2Label: 'Address2',
        initialAddress2: 'Apt 2',
        address2Validator: jest.fn(),
        cityLabel: 'City',
        initialCity: 'Pittsburgh',
        cityValidator: jest.fn(),
        stateLabel: 'State',
        initialState: { name: 'Pennsylvania', id: 'PA' },
        stateValidator: jest.fn(),
        stateOptions: [
            { name: 'Pennsylvania', id: 'PA' },
            { name: 'Ohio', id: 'OH' },
        ],
        zipCodeLabel: 'Postal Code',
        initialZipCode: '15222',
        zipCodeValidator: jest.fn(),
        countryLabel: 'Country/Territory',
        initialCountry: { name: 'United States', id: 'US' },
        countryValidator: jest.fn(),
    };

    beforeEach(() => {
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <OrganizationDetailsScreenBase {...mockProps} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );
    });

    it('renders all input fields and labels', () => {
        expect(screen.getByLabelText(mockProps.addressLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(mockProps.address2Label)).toBeInTheDocument();
        expect(screen.getByLabelText(mockProps.cityLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(mockProps.stateLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(mockProps.zipCodeLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(mockProps.countryLabel)).toBeInTheDocument();
    });

    it('sets initial values correctly', () => {
        expect(screen.getByLabelText(mockProps.addressLabel)).toHaveValue(mockProps.initialAddress);
        expect(screen.getByLabelText(mockProps.address2Label)).toHaveValue(mockProps.initialAddress2);
        expect(screen.getByLabelText(mockProps.cityLabel)).toHaveValue(mockProps.initialCity);
        expect(screen.getByLabelText(mockProps.stateLabel)).toHaveValue(mockProps.initialState.id);
        expect(screen.getByLabelText(mockProps.zipCodeLabel)).toHaveValue(mockProps.initialZipCode);
        expect(screen.getByLabelText(mockProps.countryLabel)).toHaveValue(mockProps.initialCountry.name);
    });

    it('handles address input change', () => {
        const addressInput = screen.getByLabelText(mockProps.addressLabel);
        fireEvent.change(addressInput, { target: { value: '456 Elm St' } });
        expect(addressInput).toHaveValue('456 Elm St');
    });

    it('handles address2 input change', () => {
        const address2Input = screen.getByLabelText(mockProps.address2Label);
        fireEvent.change(address2Input, { target: { value: 'Apt 3' } });
        expect(address2Input).toHaveValue('Apt 3');
    });

    it('handles city input change', () => {
        const cityInput = screen.getByLabelText(mockProps.cityLabel);
        fireEvent.change(cityInput, { target: { value: 'Philadelphia' } });
        expect(cityInput).toHaveValue('Philadelphia');
    });

    it('handles zipCode input change', () => {
        const zipCodeInput = screen.getByLabelText(mockProps.zipCodeLabel);
        fireEvent.change(zipCodeInput, { target: { value: '15227' } });
        expect(zipCodeInput).toHaveValue('15227');
    });

    // @TODO: write test to validate form and check if next button is enabled/disabled
});
