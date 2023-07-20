import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContextProvider';

export const LanguageSelector = (props: SelectProps): JSX.Element => {
    const { language, setLanguage } = useApp();
    const [selectedLanguage, setSelectedLanguage] = useState(language);

    const changeAppLanguage = (event: SelectChangeEvent): void => {
        const appLanguage = event.target.value;
        setSelectedLanguage(appLanguage);
        setLanguage(appLanguage);
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
