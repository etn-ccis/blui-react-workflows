import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import i18n from '../translations/i18n';

export const LanguageSelector = (props: SelectProps): JSX.Element => {
    const supportedLanguages = ['en', 'fr', 'es', 'zh', 'pt'];
    const [selectedLanguage, setSelectedLanguage] = useState(
        window.localStorage.getItem('app-i18nextLng')?.toString() ?? 'en'
    );
    const changeAppLanguage = (event: SelectChangeEvent): void => {
        const appLanguage = event.target.value;
        setSelectedLanguage(appLanguage);
        void i18n.changeLanguage(appLanguage);
    };

    return (
        <FormControl fullWidth>
            {props.label && <InputLabel id="select-label">{props.label}</InputLabel>}
            <Select
                value={supportedLanguages.includes(selectedLanguage) ? selectedLanguage : 'en'}
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
