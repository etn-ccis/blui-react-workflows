import React from 'react';
import { SuccessScreenBase, SuccessScreenProps } from '@brightlayer-ui/react-auth-workflow';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export const SuccessScreenBaseTest: React.FC<SuccessScreenProps> = () => {
    const navigate = useNavigate();

    return (
        <SuccessScreenBase
            title="Account Created!"
            icon={<CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 2 }} />}
            messageTitle="Welcome, User person!"
            message="Your account has been successfully created with the email example@email.com. Your account has already been added to the Acme Co. organization. Press continue below to finish."
            dismissButtonLabel="Continue"
            canDismiss={true}
            onDismiss={(): void => navigate('/login')}
        />
    );
};
