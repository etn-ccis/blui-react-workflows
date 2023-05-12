import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import defaultBackgroundImage from '../../../assets/images/background.svg';
import Card from '@mui/material/Card';
import {
    BrandedCardContainerClassKey,
    getBrandedCardContainerUtilityClass,
} from '../../../components/BrandedCardContainer/BrandedCardContainerClasses';
import { Spinner } from '../../../components/Spinner';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { cx } from '@emotion/css';
import { WorkflowCardBaseProps } from './WorkflowCardTypes';

const useUtilityClasses = (ownerState: WorkflowCardBaseProps): Record<BrandedCardContainerClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        card: ['card'],
    };

    return composeClasses(slots, getBrandedCardContainerUtilityClass, classes);
};

export const WorkflowCard: React.FC<WorkflowCardBaseProps> = (props) => {
    const {
        loading,
        background,
        error,
        children,
        cardStyles,
        CardProps,
        slots = {},
        slotProps = {},
        LoaderComponent = <Spinner visible={loading} component={slots.loader} {...slotProps.loader} />,
        classes = {},
        className: userClassName,
        ...otherCardProps
    } = props;
    const theme = useTheme();
    const defaultClasses = useUtilityClasses(props);

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                backgroundColor: theme.palette.mode === 'light' ? 'primary.main' : 'primary.dark',
                backgroundImage: background ? `url(${background})` : `url(${defaultBackgroundImage})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            className={cx(defaultClasses.root, classes.root, userClassName)}
            {...otherCardProps}
        >
            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '450px',
                    maxHeight: '730px',
                    // overflow: 'auto',
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
