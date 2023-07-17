import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContextProvider';
import { routes } from '../navigation/Routing';

const LinksWrapperStyles = {
    textAlign: 'center',
    pb: 4,
};

export const DebugComponent = (): JSX.Element => {
    const { language, setLanguage } = useApp();
    const [debugMode, setDebugMode] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(language);

    const changeAppLanguage = (event: SelectChangeEvent): void => {
        const appLanguage = event.target.value;
        setSelectedLanguage(appLanguage);
        setLanguage(appLanguage);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>{debugMode && <Typography variant={'h6'}>DEBUG MODE</Typography>}</Box>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    onClick={(): void => {
                        setDebugMode(!debugMode);
                    }}
                >
                    {`DEBUG`}
                </Button>
            </Box>
            {debugMode && (
                <>
                    {' '}
                    <Box sx={LinksWrapperStyles}>
                        <Typography variant="body2">
                            <Link to={`${routes?.REGISTER_INVITE || '/register-by-invite'}`}>
                                [Test Invite Register]
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link to={`${routes?.RESET_PASSWORD || '/reset-password'}`}>
                                [Test Reset Password Email]
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ py: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Language</InputLabel>
                            <Select
                                labelId="login-select-label"
                                id="login-select"
                                value={selectedLanguage}
                                label="Language"
                                onChange={changeAppLanguage}
                            >
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'es'}>Spanish</MenuItem>
                                <MenuItem value={'fr'}>French</MenuItem>
                                <MenuItem value={'zh'}>Chinese</MenuItem>
                                <MenuItem value={'pt'}>Portugese</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </>
            )}
        </Box>
    );
};
