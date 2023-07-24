import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import React, { useState } from 'react';
import { useAppContext } from '../contexts';

export const LanguageSelector = (props: SelectProps): JSX.Element => {
    const app = useAppContext();
    const [selectedLanguage, setSelectedLanguage] = useState(app.language);

    const changeAppLanguage = (event: SelectChangeEvent): void => {
        const appLanguage = event.target.value;
        setSelectedLanguage(appLanguage);
        app.setLanguage(appLanguage);
        window.localStorage.setItem('language', appLanguage);
    };

    return (
        <FormControl fullWidth>
            {props.label && <InputLabel id="select-label">{props.label}</InputLabel>}
            <Select
                value={selectedLanguage}
                label={props.label}
                onChange={changeAppLanguage}
                variant={props.variant}
                sx={props.sx}
            >
                <MenuItem value={'en'}>English</MenuItem>
                <MenuItem value={'es'}>Spanish</MenuItem>
                <MenuItem value={'fr'}>French</MenuItem>
                <MenuItem value={'zh'}>Chinese</MenuItem>
                <MenuItem value={'pt'}>Portugese</MenuItem>
            </Select>
        </FormControl>
    );
};
