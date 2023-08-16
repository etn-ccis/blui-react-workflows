import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import React, { useState } from 'react';
// import { useApp } from '../contexts/AppContextProvider';
// import { useTranslation } from 'react-i18next';
import i18next from '../translations/i18n';

export const LanguageSelector = (props: SelectProps): JSX.Element => {
    // const { language, setLanguage } = useApp();
    const [selectedLanguage, setSelectedLanguage] = useState(window.localStorage.getItem('app-i18nextLng')?.toString() ?? 'en');
    const changeAppLanguage = (event: SelectChangeEvent): void => {
        const appLanguage = event.target.value;
        setSelectedLanguage(appLanguage);
        // setLanguage(appLanguage);
        void i18next.changeLanguage(appLanguage);
        // window.localStorage.setItem('app-i18nextLng', appLanguage);
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
                <MenuItem value={'pt'}>Portuguese</MenuItem>
            </Select>
        </FormControl>
    );
};
