import React from 'react';
import { Box } from '@mui/material';
import { CreatePasswordScreen } from '@brightlayer-ui/react-auth-workflow';
import { useTranslation } from "react-i18next";

export const CreatePassword = (): JSX.Element => {
    const { t } = useTranslation();
    console.log('test', t('blui:WELCOME1'))
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: '1 1 0px' }}>

                <CreatePasswordScreen WorkflowCardHeaderProps={{
                    title: t('blui:WELCOME1'),
                }} />
            </Box>

        </Box>
    );
};
