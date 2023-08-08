import { TextFieldProps } from '@mui/material/TextField';

export type MinifiedTextFieldProps = Omit<TextFieldProps, 'label' | 'inputRef' | 'value' | 'onChange' | 'onKeyUp'>;

export type RouteConfig = {
    LOGIN?: string;
    FORGOT_PASSWORD?: string;
    RESET_PASSWORD?: string;
    REGISTER_INVITE?: string;
    REGISTER_SELF?: string;
    SUPPORT?: string;
};
