import React from 'react';
import Box from '@mui/material/Box';
import { WorkflowCardActionsProps } from './WorkflowCardActions';
import { WorkflowCardHeaderProps } from './WorkflowCardHeader';
import { WorkflowCardInstructionProps } from './WorkflowCardInstructions';
import { useTheme } from '@mui/material/styles';
import { useInjectedUIContext } from '../../../auth-shared';
import defaultBackgroundImage from '../../../assets/images/background.svg';
import Card, { CardProps } from '@mui/material/Card';

// import { cx } from '@emotion/css';
// import generateUtilityClass from '@mui/material/generateUtilityClass';
// import generateUtilityClasses from '@mui/material/generateUtilityClasses';
// import { unstable_composeClasses as composeClasses } from '@mui/base';

// export type WorkflowCardClasses = {
//     root?: string;
//     card?: string;
// };

// export type WorkflowCardClassKey = keyof WorkflowCardClasses;

// export function getBrandedCardContainerUtilityClass(slot: string): string {
//     return generateUtilityClass('BluiBrandedCardContainer', slot);
// }

// const workflowCardClasses: WorkflowCardClasses = generateUtilityClasses('BluiBrandedCardContainer', ['root', 'card']);

type WorkflowCardBaseProps = {
    loading?: boolean;
    backgroundImage?: string; // card background
    error?: boolean | string; // each screen should have an error state
};

type WorkflowCardProps = CardProps &
    WorkflowCardHeaderProps &
    WorkflowCardInstructionProps &
    WorkflowCardActionsProps &
    WorkflowCardBaseProps;

// const useUtilityClasses = (ownerState: WorkflowCardProps): Record<WorkflowCardClassKey, string> => {
//     const { classes } = ownerState;

//     const slots = {
//         root: ['root'],
//         card: ['card'],
//     };

//     return composeClasses(slots, getBrandedCardContainerUtilityClass, classes);
// };

export const WorkflowCard: React.FC<WorkflowCardProps> = (props) => {
    const { loading, backgroundImage, error, children } = props;
    const theme = useTheme();
    const { background } = useInjectedUIContext();
    // const defaultClasses = useUtilityClasses(props);

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                backgroundColor: theme.palette.mode === 'light' ? 'primary.main' : 'primary.dark',
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${defaultBackgroundImage})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            style={background || {}}
            // className={cx(defaultClasses.root, classes.root, userClassName)}
            // {...otherProps}
        >
            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '450px',
                    maxHeight: '730px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    [theme.breakpoints.down('sm')]: {
                        maxWidth: 'none',
                        maxHeight: 'none',
                        borderRadius: 0,
                    },
                    // ...cardStyles,
                }}
                // className={cx(defaultClasses.card, classes.card)}
                // component={slots.card}
                // {...CardProps}
                // {...slotProps.card}
            >
                {children}
            </Card>
        </Box>
    );
};
