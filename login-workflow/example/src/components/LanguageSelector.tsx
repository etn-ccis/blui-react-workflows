import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import i18n from '../translations/i18n';
import { useApp } from '../contexts/AppContextProvider';

export const LanguageSelector = (props: SelectProps): JSX.Element => {
    const supportedLanguages = ['en', 'fr', 'es', 'zh', 'pt'];

    const { language, setLanguage } = useApp();
    const [selectedLanguage, setSelectedLanguage] = useState(language);

    const changeAppLanguage = (event: SelectChangeEvent): void => {
        const appLanguage = event.target.value;
        setSelectedLanguage(appLanguage);
        setLanguage(appLanguage);
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
