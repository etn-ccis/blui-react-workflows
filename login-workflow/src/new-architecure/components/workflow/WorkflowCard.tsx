import React, { ReactNode } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { WorkflowCardActionsProps } from './WorkflowCardActions';
import { WorkflowCardHeaderProps } from './WorkflowCardHeader';
import { WorkflowCardInstructionProps } from './WorkflowCardInstructions';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { useInjectedUIContext } from '../../../auth-shared';
import defaultBackgroundImage from '../../../assets/images/background.svg';
import Card, { CardProps as CardPropsType } from '@mui/material/Card';
import {
    BrandedCardContainerClasses,
    BrandedCardContainerClassKey,
    getBrandedCardContainerUtilityClass,
} from '../../../components/BrandedCardContainer/BrandedCardContainerClasses';
import { Spinner, SpinnerProps } from '../../../components/Spinner';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { cx } from '@emotion/css';

type WorkflowCardBaseProps = BoxProps & {
    loading?: boolean;
    backgroundImage?: string; // card background
    error?: boolean | string; // each screen should have an error state
    cardStyles?: SxProps<Theme>;
    CardProps?: CardPropsType;
    LoaderComponent?: ReactNode;
    classes?: BrandedCardContainerClasses;
    slots?: { card?: React.ElementType; loader?: React.ElementType };
    slotProps?: {
        card?: CardPropsType;
        loader?: SpinnerProps;
    };
};

const useUtilityClasses = (ownerState: WorkflowCardBaseProps): Record<BrandedCardContainerClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        card: ['card'],
    };

    return composeClasses(slots, getBrandedCardContainerUtilityClass, classes);
};

type WorkflowCardProps = CardPropsType &
    WorkflowCardHeaderProps &
    WorkflowCardInstructionProps &
    WorkflowCardActionsProps &
    WorkflowCardBaseProps;

export const WorkflowCard: React.FC<WorkflowCardProps> = (props) => {
    const {
        loading,
        backgroundImage,
        error,
        children,
        cardStyles,
        CardProps,
        slots = {},
        slotProps = {},
        LoaderComponent = <Spinner visible={loading} component={slots.loader} {...slotProps.loader} />,
        classes = {},
        className: userClassName,
        ...otherProps
    } = props;
    const theme = useTheme();
    const { background } = useInjectedUIContext();
    const defaultClasses = useUtilityClasses(props);

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
            className={cx(defaultClasses.root, classes.root, userClassName)}
            {...otherProps}
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
                    ...cardStyles,
                }}
                className={cx(defaultClasses.card, classes.card)}
                component={slots.card}
                {...CardProps}
                {...slotProps.card}
            >
                {LoaderComponent}
                {children}
            </Card>
        </Box>
    );
};
