import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import defaultBackgroundImage from '../../../assets/images/background.svg';
import Card from '@mui/material/Card';
import { Spinner } from '../../../components/Spinner';
import { WorkflowCardBaseProps } from './WorkflowCard.types';
import { getWorkflowCardUtilityClass, WorkflowCardClassKey } from './Utility';
import { unstable_composeClasses as composeClasses } from '@mui/base';

const useUtilityClasses = (ownerState: WorkflowCardBaseProps): Record<WorkflowCardClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        card: ['card'],
    };

    return composeClasses(slots, getWorkflowCardUtilityClass, classes);
};

export const WorkflowCard: React.FC<WorkflowCardBaseProps> = (props) => {
    const {
        loading,
        backgroundImage,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error,
        sx,
        children,
        slots = {},
        LoaderComponent = <Spinner visible={loading} component={slots.loader} />,
        ...otherCardProps
    } = props;
    const theme = useTheme();
    const defaultClasses = useUtilityClasses(props);

    return (
        <Box
            sx={[
                {
                    height: '100vh',
                    width: '100%',
                    backgroundColor: theme.palette.mode === 'light' ? 'primary.main' : 'primary.dark',
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${defaultBackgroundImage})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            className={defaultClasses.root}
            data-testid={defaultClasses.root}
            {...otherCardProps}
        >
            <Card
                sx={[
                    {
                        width: '100%',
                        height: '100%',
                        maxWidth: '450px',
                        maxHeight: '730px',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        borderRadius: { xs: 0, sm: '4px' },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
                className={defaultClasses.card}
                data-testid={defaultClasses.card}
                component={slots.card}
            >
                {LoaderComponent}
                {children}
            </Card>
        </Box>
    );
};
