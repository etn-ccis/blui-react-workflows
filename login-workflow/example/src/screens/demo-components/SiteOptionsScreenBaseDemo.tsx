import React from 'react';
import { SiteOptionsScreenBase } from '@brightlayer-ui/react-auth-workflow';
import DomainIcon from '@mui/icons-material/Domain';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const SiteOptionsScreenBaseDemo: React.FC = () => (
    <SiteOptionsScreenBase
        icon={
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#e0eff8',
                    borderRadius: '50%',
                }}
            >
                <DomainIcon color={'primary'} sx={{ fontSize: 54 }} />
            </Box>
        }
        message={
            <>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {`Now that you've specified your account details, you need to add your Organization details.`}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {`If you want to create a new Organization, choose Create a New Organization below.`}
                </Typography>
                <Typography variant="subtitle2">
                    {`If your Organization already exists, ask your administrator to provide you with the Registration
                                            Code and choose Join Existing Organization below.`}
                </Typography>
            </>
        }
        createNewOrgLabel="Create a New Organization"
        joinExistingOrgLabel="Join Existing Organization"
        WorkflowCardHeaderProps={{
            title: 'Join an Organization',
        }}
        onCreateNewOrg={(): void => {}}
        onJoinExistingOrg={(): void => {}}
    />
);
