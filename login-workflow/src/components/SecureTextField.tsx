import React, { useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/**
 * Component that renders textfield with a visibility toggle. The toggle changes the
 * input from hidden to visible.
 *
 * @param props all props will be passed to the underlying TextField component
 *
 * @category Component
 */
export const SecureTextField: React.FC<React.PropsWithChildren<React.PropsWithChildren<TextFieldProps>>> = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            type={showPassword ? 'text' : 'password'}
            variant="filled"
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={(): void => setShowPassword(!showPassword)}
                            edge={'end'}
                            size="large"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};
