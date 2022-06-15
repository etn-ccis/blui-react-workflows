import React from 'react';
import { RegistrationData } from '@brightlayer-ui/react-auth-workflow';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { EmptyState } from '@brightlayer-ui/react-components';
import Person from '@mui/icons-material/Person';

type CustomRegistrationProps = {
    registrationData: RegistrationData;
};

export const CustomRegistrationSuccessScreen: React.FC<React.PropsWithChildren<CustomRegistrationProps>> = (props) => {
    const matchesXS = useMediaQuery('(max-width:600px)');

    return (
        <>
            <CardHeader
                title={
                    <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
                        Custom Registration Success Screen
                    </Typography>
                }
                sx={{ p: matchesXS ? '16px 24px 0 24px' : '32px 24px 0 24px' }}
            />
            <CardContent
                sx={{
                    flex: '1 1 0px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    p: '16px 24px',
                }}
            >
                <EmptyState
                    icon={<Person color={'primary'} sx={{ fontSize: 100 }} />}
                    title={`Congratulations ${props.registrationData?.accountDetails?.firstName || ''}${' '}
                ${props.registrationData?.accountDetails?.lastName || ''}!`}
                    description={'You made it to the custom registration success screen!'}
                />
            </CardContent>
            <Divider />
            <CardActions sx={{ p: 3, justifyContent: 'flex-end' }}>
                <Button
                    variant={'contained'}
                    disableElevation
                    color={'primary'}
                    sx={{ width: '100%' }}
                    component={Link}
                    to={'/custom-login-route'}
                >
                    Continue
                </Button>
            </CardActions>
        </>
    );
};

export const CustomAccountAlreadyExistsScreen: React.FC<React.PropsWithChildren<unknown>> = () => {
    const matchesXS = useMediaQuery('(max-width:600px)');

    return (
        <>
            <CardHeader
                title={
                    <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
                        Custom Account Already Exists Screen
                    </Typography>
                }
                sx={{ p: matchesXS ? '16px 24px 0 24px' : '32px 24px 0 24px' }}
            />
            <CardContent
                sx={{
                    flex: '1 1 0px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    p: '16px 24px',
                }}
            >
                <EmptyState
                    icon={<Person color={'primary'} sx={{ fontSize: 100 }} />}
                    title={'Congratulations!'}
                    description={'You made it to the custom account already exists success screen!'}
                />
            </CardContent>
            <Divider />
            <CardActions sx={{ p: 3, justifyContent: 'flex-end' }}>
                <Button
                    variant={'contained'}
                    disableElevation
                    color={'primary'}
                    sx={{ width: '100%' }}
                    component={Link}
                    to={'/custom-login-route'}
                >
                    Continue
                </Button>
            </CardActions>
        </>
    );
};
