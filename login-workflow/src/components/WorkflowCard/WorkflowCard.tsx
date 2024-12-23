import React from 'react';
import Box from '@mui/material/Box';
import defaultBackgroundImage from '../../assets/images/background.svg';
import Card from '@mui/material/Card';
import { Spinner } from '../Spinner/Spinner';
import { WorkflowCardBaseProps } from './WorkflowCard.types';
import { getWorkflowCardUtilityClass, WorkflowCardClassKey } from './Utility';
import { unstable_composeClasses as composeClasses, useTheme } from '@mui/material';

const useUtilityClasses = (ownerState: WorkflowCardBaseProps): Record<WorkflowCardClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        card: ['card'],
    };

    return composeClasses(slots, getWorkflowCardUtilityClass, classes);
};

/**
 * Component that renders the workflow card that is used for all screen components.
 *
 * @param {WorkflowCardBaseProps} props - props of workflowCardBase component
 *
 * @category Component
 */

export const WorkflowCard: React.FC<WorkflowCardBaseProps> = (props) => {
    const { loading, backgroundImage, sx, children, ...otherBoxProps } = props;
    const defaultClasses = useUtilityClasses(props);
    const theme = useTheme();

    return (
        <Box
            sx={{
                    height: '100vh',
                    width: '100%',
                    backgroundColor: 'primary.main',
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${defaultBackgroundImage})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...theme.applyStyles('dark', {
                        backgroundColor: 'primary.dark',
                    }),
                    ...sx
                }}
            className={defaultClasses.root}
            data-testid={defaultClasses.root}
            {...otherBoxProps}
        >
            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: { sm: '450px', xs: 'none' },
                    maxHeight: { sm: '730px', xs: 'none' },
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderRadius: { xs: 0, sm: '4px' },
                }}
                className={defaultClasses.card}
                data-testid={defaultClasses.card}
            >
                <>
                    <Spinner data-testid="blui-spinner" visible={loading} />
                    {children}
                </>
            </Card>
        </Box>
    );
};
