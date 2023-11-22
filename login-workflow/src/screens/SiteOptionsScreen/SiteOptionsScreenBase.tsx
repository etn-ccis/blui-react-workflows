import React from 'react';
import { SiteOptionsScreenProps } from './types';
import { WorkflowCard, WorkflowCardHeader, WorkflowCardBody, WorkflowCardInstructions } from '../../components';
import ErrorManager from '../../components/Error/ErrorManager';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
/**
 * Component that renders a success screen
 *
 * @param icon the icon to be displayed on the screen
 * @param message success message to be displayed on the screen
 * @param joinExistingOrgLabel to display label for the custom button which redirects to existing organization flow
 * @param createNewOrgLabel display label for the custom button which redirects to create a new organization flow
 * @param onJoinExistingOrg function to call when user wants to join existing organization
 * @param onCreateNewOrg function to call when user wants to create a new  organization
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 *
 * @category Component
 */

export const SiteOptionsScreenBase: React.FC<React.PropsWithChildren<SiteOptionsScreenProps>> = (props) => {
    const {
        icon,
        message = '',
        joinExistingOrgLabel = '',
        createNewOrgLabel = '',
        canCreateNewOrg,
        canJoinExistingOrg,
        onJoinExistingOrg,
        onCreateNewOrg,
        errorDisplayConfig,
    } = props;
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        {icon && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 6,
                                }}
                            >
                                {icon}
                            </Box>
                        )}
                        {message && (
                            <Box
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {message}
                            </Box>
                        )}
                    </Box>
                </ErrorManager>
            </WorkflowCardBody>
            <Divider />
            <Box
                sx={{
                    p: { xs: 2, md: 3 },
                }}
            >
                <CardActions
                    sx={[
                        {
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            p: 0,
                            '>:not(:first-of-type)': {
                                ml: 0,
                            },
                        },
                    ]}
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{
                            mb: { xs: 2, md: 3 },
                        }}
                        disabled={
                            canCreateNewOrg === false || (typeof canCreateNewOrg === 'function' && !canCreateNewOrg())
                        }
                        onClick={onCreateNewOrg}
                    >
                        {createNewOrgLabel}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={
                            canJoinExistingOrg === false ||
                            (typeof canJoinExistingOrg === 'function' && !canJoinExistingOrg())
                        }
                        onClick={onJoinExistingOrg}
                        sx={{
                            ml: 0,
                        }}
                    >
                        {joinExistingOrgLabel}
                    </Button>
                </CardActions>
            </Box>
        </WorkflowCard>
    );
};
