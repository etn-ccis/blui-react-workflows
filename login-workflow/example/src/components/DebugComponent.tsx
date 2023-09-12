import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { routes } from '../navigation/Routing';
import { LanguageSelector } from './LanguageSelector';

const LinksWrapperStyles = {
    textAlign: 'center',
    pb: 4,
};

export const DebugComponent = (): JSX.Element => {
    const [debugMode, setDebugMode] = useState(false);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <Box>{debugMode && <Typography variant={'h6'}>DEBUG MODE</Typography>}</Box>
                <Button
                    sx={{
                        position: 'absolute',
                        right: 0,
                    }}
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
                            <Link
                                to={`${
                                    routes?.REGISTER_INVITE ||
                                    '/register-by-invite?code=DEBUG_VALIDATION_CODE_DEADBEEF&email=example@example.com'
                                }`}
                            >
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
                        <LanguageSelector label="Language" variant="outlined" />
                    </Box>
                </>
            )}
        </Box>
    );
};
