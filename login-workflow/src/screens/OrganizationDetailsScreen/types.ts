import { BoxProps, TextFieldProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type CountryOption = {
    name: string;
    id: string;
};

export type StateOption = {
    name: string;
    id: string;
};

export type OrganizationDetailsScreenProps = WorkflowCardProps &
    BoxProps & {
        /**
         * The label for the address text field
         */
        addressLabel?: string;

        /**
         * The initial value for the address text field
         */
        initialAddress?: string;

        /**
         * The function that validates the address text field
         * @param {string} address
         * @returns boolean | string
         */
        addressValidator?: (address: string) => boolean | string;

        /**
         * The props to pass to the address field.
         * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
         */
        addressTextFieldProps?: TextFieldProps;

        /**
         * The label for the address2 text field
         */
        address2Label?: string;

        /**
         * The initial value for the address2 text field
         */
        initialAddress2?: string;

        /**
         * The function that validates the address2 text field
         * @param {string} address
         * @returns boolean | string
         */
        address2Validator?: (address: string) => boolean | string;

        /**
         * The props to pass to the address2 field.
         * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
         */
        address2TextFieldProps?: TextFieldProps;

        /**
         * The label for the city text field
         */
        cityLabel?: string;

        /**
         * The initial value for the city text field
         */
        initialCity?: string;

        /**
         * The function that validates the city text field
         * @param {string} city
         * @returns boolean | string
         */
        cityValidator?: (city: string) => boolean | string;

        /**
         * The props to pass to the city field.
         * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
         */
        cityTextFieldProps?: TextFieldProps;

        /**
         * The label for the state autocomplete text field
         */
        stateLabel?: string;

        /**
         * The options for the state autocomplete text field
         */
        stateOptions?: StateOption[];

        /**
         * The initial value for the state autocomplete text field
         */
        initialState?: StateOption;

        /**
         * The function that validates the state autocomplete text field
         * @param {string} state
         * @returns boolean | string
         */
        stateValidator?: (state: string) => boolean | string;

        /**
         * The props to pass to the state autocomplete text field.
         * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
         */
        stateTextFieldProps?: TextFieldProps;

        /**
         * The label for the zip code text field
         */
        zipCodeLabel?: string;

        /**
         * The initial value for the zip code text field
         */
        initialZipCode?: string;

        /**
         * The function that validates the zip code text field
         * @param {string} zipCode
         * @returns boolean | string
         */
        zipCodeValidator?: (zipCode: string) => boolean | string;

        /**
         * The props to pass to the zip code field.
         * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
         */
        zipCodeTextFieldProps?: TextFieldProps;

        /**
         * The label for the country autocomplete text field
         */
        countryLabel?: string;

        /**
         * The options for the country autocomplete text field
         */
        countryOptions?: CountryOption[];

        /**
         * The initial value for the country autocomplete text field
         */
        initialCountry?: CountryOption;

        /**
         * The function that validates the country autocomplete text field
         * @param {string} country
         * @returns boolean | string
         */
        countryValidator?: (country: string) => boolean | string;

        /**
         * The props to pass to the country autocomplete text field.
         * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
         */
        countryTextFieldProps?: TextFieldProps;

        /**
         * The configuration for customizing how errors are displayed
         */
        errorDisplayConfig?: ErrorManagerProps;
    };
