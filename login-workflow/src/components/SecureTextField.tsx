import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, TextFieldProps } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export const SecureTextField: React.FC<TextFieldProps> = (props) => {
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
