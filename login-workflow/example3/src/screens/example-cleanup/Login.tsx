import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { LoginScreen, useAuthContext } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../../assets/images/eaton_stacked_logo.png';
import { useApp } from '../../contexts/AppContextProvider';
import { routes } from '../../navigation/Routing';

const LinksWrapperStyles = {
    textAlign: 'center',
    pb: 4,
};
export const Login = (): JSX.Element => {
    const { language, setLanguage, setIsAuthenticated } = useApp();
    const auth = useAuthContext();
    const [debugMode, setDebugMode] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState(language);

    const changeAppLanguage = (event: SelectChangeEvent): void => {
        const appLanguage = event.target.value;
        setSelectedLanguage(appLanguage);
        setLanguage(appLanguage);
    };
    return (
        <>
            <LoginScreen
                onLogin={(username, password): void => {
                    // eslint-disable-next-line no-console
                    console.log('onLogin', username, password);
                    setIsAuthenticated(true);
                    auth.navigate('guarded');
                }}
                usernameTextFieldProps={{
                    inputProps: {
                        maxLength: 30,
                    },
                }}
                passwordTextFieldProps={{
                    required: true,
                }}
                onRememberMeChanged={(value: boolean): void => {
                    // eslint-disable-next-line no-console
                    console.log('onRememberMeChanged', value);
                }}
                // showRememberMe={false}
                onForgotPassword={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('onForgotPassword');
                    auth.navigate('forgot-password');
                }}
                onSelfRegister={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('onSelfRegister');
                    auth.navigate('self-registration');
                }}
                onContactSupport={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('onContactSupport');
                    auth.navigate('contact-support');
                }}
                projectImage={<img src={EatonLogo} alt="logo" style={{ maxHeight: 80 }} />}
                header={
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
                        )}
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
                    </Box>
                }
            />
        </>
    );
};
