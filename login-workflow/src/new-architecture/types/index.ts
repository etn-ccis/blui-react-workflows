import { TextFieldProps } from '@mui/material/TextField';

export type MinifiedTextFieldProps = Omit<TextFieldProps, 'label' | 'inputRef' | 'value' | 'onChange' | 'onKeyUp'>;
