import React, { useCallback, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import { CountryOption, OrganizationDetailsScreenProps, StateOption } from './types';
import ErrorManager from '../../components/Error/ErrorManager';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

/**
 * Component that renders a screen with organization details information.
 *
 * @param addressLabel label for the address text field
 * @param initialAddress initial value for the address text field
 * @param addressValidator function that validates the address text field
 * @param addressTextFieldProps props to pass to the address text field
 * @param address2Label label for the address2 text field
 * @param initialAddress2 initial value for the address2 text field
 * @param address2Validator function that validates the address2 text field
 * @param address2TextFieldProps props to pass to the address2 text field
 * @param cityLabel label for the city text field
 * @param initialCity initial value for the city text field
 * @param cityValidator function that validates the city text field
 * @param cityTextFieldProps props to pass to the city text field
 * @param stateCodeLabel label for the state autocomplete text field
 * @param initialState initial value for the state autocomplete text field
 * @param stateCodeValidator function that validates the state autocomplete text field
 * @param stateTextFieldProps props to pass to the state autocomplete text field
 * @param zipCodeLabel label for the zip code text field
 * @param initialZipCode initial value for the zip code text field
 * @param zipCodeValidator function that validates the zip code text field
 * @param zipCodeTextFieldProps props to pass to the zip code text field
 * @param countryCodeLabel label for the country autocomplete text field
 * @param initialCountry initial value for the country autocomplete text field
 * @param countryValidator function that validates the country autocomplete text field
 * @param countryTextFieldProps props to pass to the country autocomplete text field
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 *
 * @category Component
 */

export const OrganizationDetailsScreenBase: React.FC<OrganizationDetailsScreenProps> = (props) => {
    const {
        addressLabel,
        initialAddress,
        addressValidator = (): void => {},
        addressTextFieldProps,
        address2Label,
        initialAddress2,
        address2Validator = (): void => {},
        address2TextFieldProps,
        cityLabel,
        initialCity,
        cityValidator = (): void => {},
        cityTextFieldProps,
        stateLabel,
        stateOptions = [],
        initialState,
        stateValidator = (): void => {},
        stateTextFieldProps,
        zipCodeLabel,
        initialZipCode,
        zipCodeValidator = (): void => {},
        zipCodeTextFieldProps,
        countryLabel,
        countryOptions = [],
        initialCountry,
        countryValidator = (): void => {},
        countryTextFieldProps,
        errorDisplayConfig,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const addressRef = useRef<any>(null);
    const address2Ref = useRef<any>(null);
    const cityRef = useRef<any>(null);
    const stateRef = useRef<any>(null);
    const zipCodeRef = useRef<any>(null);
    const countryRef = useRef<any>(null);

    const [addressInput, setAddressInput] = React.useState(initialAddress ? initialAddress : '');
    const [address2Input, setAddress2Input] = React.useState(initialAddress2 ? initialAddress2 : '');
    const [cityInput, setCityInput] = React.useState(initialCity ? initialCity : '');
    const [stateInput, setStateInput] = React.useState(initialState ? initialState : { name: '', id: '' });
    const [zipCodeInput, setZipCodeInput] = React.useState(initialZipCode ? initialZipCode : '');
    const [countryInput, setCountryInput] = React.useState(initialCountry ? initialCountry : { name: '', id: '' });

    const [isAddressValid, setIsAddressValid] = React.useState(false);
    const [isAddress2Valid, setIsAddress2Valid] = React.useState(true);
    const [isCityValid, setIsCityValid] = React.useState(false);
    const [isStateValid, setIsStateValid] = React.useState(false);
    const [isZipCodeValid, setIsZipCodeValid] = React.useState(false);
    const [isCountryValid, setIsCountryValid] = React.useState(false);

    const [addressError, setAddressError] = React.useState('');
    const [address2Error, setAddress2Error] = React.useState('');
    const [cityError, setCityError] = React.useState('');
    const [stateError, setStateError] = React.useState('');
    const [zipCodeError, setZipCodeError] = React.useState('');
    const [countryError, setCountryError] = React.useState('');

    const [shouldValidateAddress, setShouldValidateAddress] = React.useState(false);
    const [shouldValidateAddress2, setShouldValidateAddress2] = React.useState(false);
    const [shouldValidateCity, setShouldValidateCity] = React.useState(false);
    const [shouldValidateState, setShouldValidateState] = React.useState(false);
    const [shouldValidateZipCode, setShouldValidateZipCode] = React.useState(false);
    const [shouldValidateCountry, setShouldValidateCountry] = React.useState(false);

    const isFormValid =
        isAddressValid && isAddress2Valid && isCityValid && isStateValid && isZipCodeValid && isCountryValid;

    const handleAddressInputChange = useCallback(
        (address: string) => {
            setAddressInput(address);
            const addressValidatorResponse = addressValidator(address);

            setIsAddressValid(typeof addressValidatorResponse === 'boolean' ? addressValidatorResponse : false);
            setAddressError(typeof addressValidatorResponse === 'string' ? addressValidatorResponse : '');
        },
        [addressValidator]
    );

    const handleAddress2InputChange = useCallback(
        (address2: string) => {
            setAddress2Input(address2);
            const address2ValidatorResponse = address2Validator(address2);

            setIsAddress2Valid(
                typeof address2ValidatorResponse === 'boolean'
                    ? address2ValidatorResponse
                    : address2ValidatorResponse === undefined
                    ? true
                    : false
            );
            setAddress2Error(typeof address2ValidatorResponse === 'string' ? address2ValidatorResponse : '');
        },
        [address2Validator]
    );

    const handleCityInputChange = useCallback(
        (city: string) => {
            setCityInput(city);
            const cityValidatorResponse = cityValidator(city);

            setIsCityValid(typeof cityValidatorResponse === 'boolean' ? cityValidatorResponse : false);
            setCityError(typeof cityValidatorResponse === 'string' ? cityValidatorResponse : '');
        },
        [cityValidator]
    );

    const handleStateInputChange = useCallback(
        (state: StateOption) => {
            const stateValue: StateOption = state;

            setStateInput(stateValue);
            const stateValidatorResponse = stateValidator(stateValue.name);

            setIsStateValid(typeof stateValidatorResponse === 'boolean' ? stateValidatorResponse : false);
            setStateError(typeof stateValidatorResponse === 'string' ? stateValidatorResponse : '');
        },
        [stateValidator]
    );

    const handleZipCodeInputChange = useCallback(
        (zipCode: string) => {
            setZipCodeInput(zipCode);
            const zipCodeValidatorResponse = zipCodeValidator(zipCode);

            setIsZipCodeValid(typeof zipCodeValidatorResponse === 'boolean' ? zipCodeValidatorResponse : false);
            setZipCodeError(typeof zipCodeValidatorResponse === 'string' ? zipCodeValidatorResponse : '');
        },
        [zipCodeValidator]
    );

    const handleCountryInputChange = useCallback(
        (country: CountryOption) => {
            const countryValue: CountryOption = country;

            setCountryInput(countryValue);
            setStateInput({ name: '', id: '' });

            const countryValidatorResponse = countryValidator(countryValue.name);

            setIsCountryValid(typeof countryValidatorResponse === 'boolean' ? countryValidatorResponse : false);
            setCountryError(typeof countryValidatorResponse === 'string' ? countryValidatorResponse : '');
        },
        [countryValidator]
    );

    useEffect(() => {
        if (addressInput.length > 0) {
            setShouldValidateAddress(true);
            handleAddressInputChange(addressInput);
        }
        if (address2Input.length > 0) {
            setShouldValidateAddress2(true);
            handleAddress2InputChange(address2Input);
        }
        if (cityInput.length > 0) {
            setShouldValidateCity(true);
            handleCityInputChange(cityInput);
        }
        if (countryInput.name.length > 0) {
            setShouldValidateCountry(true);
            handleCountryInputChange(countryInput);
        }
        if (stateInput.name.length > 0) {
            setShouldValidateState(true);
            handleStateInputChange(stateInput);
        }
        if (zipCodeInput.length > 0) {
            setShouldValidateZipCode(true);
            handleZipCodeInputChange(zipCodeInput);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardInstructions {...instructionsProps} />
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <TextField
                        id="address"
                        fullWidth
                        variant="filled"
                        inputRef={addressRef}
                        label={addressLabel}
                        value={addressInput}
                        error={shouldValidateAddress && !isAddressValid}
                        helperText={shouldValidateAddress && addressError}
                        {...addressTextFieldProps}
                        onChange={(e): void => {
                            addressTextFieldProps?.onChange?.(e);
                            handleAddressInputChange(e.target.value);
                        }}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && address2Ref.current) address2Ref.current.focus();
                        }}
                        onBlur={(): void => setShouldValidateAddress(true)}
                    />
                    <TextField
                        id="address2"
                        fullWidth
                        variant="filled"
                        sx={{
                            mt: { md: 3, sm: 2, xs: 2 },
                        }}
                        inputRef={address2Ref}
                        label={address2Label}
                        value={address2Input}
                        error={shouldValidateAddress2 && !isAddress2Valid}
                        helperText={shouldValidateAddress2 && address2Error}
                        {...address2TextFieldProps}
                        onChange={(e): void => {
                            address2TextFieldProps?.onChange?.(e);
                            handleAddress2InputChange(e.target.value);
                        }}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && cityRef.current) cityRef.current.focus();
                        }}
                        onBlur={(): void => setShouldValidateAddress2(true)}
                    />
                    <TextField
                        id="city"
                        fullWidth
                        variant="filled"
                        sx={{
                            mt: { md: 3, sm: 2, xs: 2 },
                        }}
                        inputRef={cityRef}
                        label={cityLabel}
                        value={cityInput}
                        error={shouldValidateCity && !isCityValid}
                        helperText={shouldValidateCity && cityError}
                        {...cityTextFieldProps}
                        onChange={(e): void => {
                            cityTextFieldProps?.onChange?.(e);
                            handleCityInputChange(e.target.value);
                        }}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && stateRef.current) stateRef.current.focus();
                        }}
                        onBlur={(): void => setShouldValidateCity(true)}
                    />
                    <Box sx={{ display: 'flex' }}>
                        <Autocomplete
                            multiple={false}
                            disableClearable
                            id="state"
                            sx={{
                                mt: { md: 3, sm: 2, xs: 2 },
                                flex: 1,
                            }}
                            options={stateOptions}
                            value={stateInput}
                            onChange={(event, value) => {
                                // @ts-ignore
                                stateTextFieldProps?.onChange?.(value);
                                handleStateInputChange(value as { name: string; id: string });
                            }}
                            getOptionLabel={(option: StateOption): string => option.name}
                            isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
                            renderInput={(params): JSX.Element => (
                                <TextField
                                    {...params}
                                    inputRef={stateRef}
                                    variant="filled"
                                    label={stateLabel}
                                    error={shouldValidateState && !isStateValid}
                                    helperText={shouldValidateState && stateError}
                                    {...stateTextFieldProps}
                                    onKeyUp={(e): void => {
                                        if (e.key === 'Enter' && zipCodeRef.current) zipCodeRef.current.focus();
                                    }}
                                    onBlur={(): void => setShouldValidateState(true)}
                                />
                            )}
                        />
                        <TextField
                            id="zipCode"
                            fullWidth
                            variant="filled"
                            sx={{
                                ml: 3,
                                mt: { md: 3, sm: 2, xs: 2 },
                                flex: 1,
                            }}
                            inputRef={zipCodeRef}
                            label={zipCodeLabel}
                            value={zipCodeInput}
                            error={shouldValidateZipCode && !isZipCodeValid}
                            helperText={shouldValidateZipCode && zipCodeError}
                            {...zipCodeTextFieldProps}
                            onChange={(e): void => {
                                zipCodeTextFieldProps?.onChange?.(e);
                                handleZipCodeInputChange(e.target.value);
                            }}
                            onKeyUp={(e): void => {
                                if (e.key === 'Enter' && countryRef.current) countryRef.current.focus();
                            }}
                            onBlur={(): void => setShouldValidateZipCode(true)}
                        />
                    </Box>
                    <Autocomplete
                        multiple={false}
                        disableClearable
                        id="country"
                        sx={{
                            mt: { md: 3, sm: 2, xs: 2 },
                        }}
                        options={countryOptions}
                        value={countryInput}
                        onChange={(event, value) => {
                            // @ts-ignore
                            countryTextFieldProps?.onChange?.(value);
                            handleCountryInputChange(value as CountryOption);
                        }}
                        getOptionLabel={(option: CountryOption): string => option.name}
                        isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
                        renderInput={(params): JSX.Element => (
                            <TextField
                                {...params}
                                inputRef={countryRef}
                                variant="filled"
                                label={countryLabel}
                                error={shouldValidateCountry && !isCountryValid}
                                helperText={shouldValidateCountry && countryError}
                                {...countryTextFieldProps}
                                onKeyUp={(e): void => {
                                    if (e.key === 'Enter' && isFormValid && actionsProps.canGoNext)
                                        actionsProps.onNext?.();
                                }}
                                onBlur={(): void => setShouldValidateCountry(true)}
                            />
                        )}
                    />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} canGoNext={actionsProps.canGoNext && isFormValid} />
        </WorkflowCard>
    );
};
