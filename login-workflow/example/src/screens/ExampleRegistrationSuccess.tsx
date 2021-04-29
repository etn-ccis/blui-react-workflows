import React from 'react';
import { RegistrationData } from '@pxblue/react-auth-workflow';
import { Button, CardActions, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { EmptyState } from '@pxblue/react-components';
import Person from '@material-ui/icons/Person';

type CustomRegistrationProps = {
    registrationData: RegistrationData;
};

export const CustomRegistrationSuccessScreen: React.FC<CustomRegistrationProps> = (props) => (
    <>
        <CardHeader
            title={
                <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                    Custom Registration Success Screen
                </Typography>
            }
            style={{ padding: '16px 24px' }}
        />
        <CardContent
            style={{
                flex: '1 1 0px',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: '16px 24px',
            }}
        >
            <EmptyState
                icon={<Person color={'primary'} style={{ fontSize: 100 }} />}
                title={`Congratulations ${props.registrationData?.accountDetails?.firstName || ''}${' '}
                ${props.registrationData?.accountDetails?.lastName || ''}!`}
                description={'You made it to the custom registration success screen!'}
            />
        </CardContent>
        <Divider />
        <CardActions style={{ padding: '24px', justifyContent: 'flex-end' }}>
            <Button
                variant={'contained'}
                disableElevation
                color={'primary'}
                style={{ width: '100%' }}
                component={Link}
                to={'/custom-login-route'}
            >
                Continue
            </Button>
        </CardActions>
    </>
);

export const CustomAccountAlreadyExistsScreen: React.FC = () => (
    <>
        <CardHeader
            title={
                <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                    Custom Account Already Exists Screen
                </Typography>
            }
            style={{ padding: '16px 24px' }}
        />
        <CardContent
            style={{
                flex: '1 1 0px',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: '16px 24px',
            }}
        >
            <EmptyState
                icon={<Person color={'primary'} style={{ fontSize: 100 }} />}
                title={'Congratulations!'}
                description={'You made it to the custom account already exists success screen!'}
            />
        </CardContent>
        <Divider />
        <CardActions style={{ padding: '24px', justifyContent: 'flex-end' }}>
            <Button
                variant={'contained'}
                disableElevation
                color={'primary'}
                style={{ width: '100%' }}
                component={Link}
                to={'/custom-login-route'}
            >
                Continue
            </Button>
        </CardActions>
    </>
);
