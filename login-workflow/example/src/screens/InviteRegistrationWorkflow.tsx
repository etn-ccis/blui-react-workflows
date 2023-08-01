import React from 'react';
import { RegistrationWorkflow } from '@brightlayer-ui/react-auth-workflow';
import { useQueryString } from './useQueryString';

export const InviteRegistrationWorkflow: React.FC = () => {
    const { code = '123', email = 'aa@ww.qq' } = useQueryString();

    return <RegistrationWorkflow isInviteRegistration inviteCode={code} inviteEmail={email} />;
};
