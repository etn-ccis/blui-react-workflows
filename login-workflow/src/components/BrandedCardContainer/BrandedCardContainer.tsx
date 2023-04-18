import React, { ReactNode } from 'react';
import Card, { CardProps as CardPropsType } from '@mui/material/Card';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { Spinner, SpinnerProps } from '../Spinner';
import defaultBackgroundImage from '../../assets/images/background.svg';
import { useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import Box, { BoxProps } from '@mui/material/Box';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import {
    getBrandedCardContainerUtilityClass,
    BrandedCardContainerClassKey,
    BrandedCardContainerClasses,
} from './BrandedCardContainerClasses';
import { cx } from '@emotion/css';

export type BrandedCardContainerProps = BoxProps & {
    loading?: boolean;
    backgroundImage?: string;
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

const useUtilityClasses = (ownerState: BrandedCardContainerProps): Record<BrandedCardContainerClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        card: ['card'],
    };

    return composeClasses(slots, getBrandedCardContainerUtilityClass, classes);
};

/**
 * Component that renders a card centered on a blue textured background.
 *
 * @param loading if true a loading spinner will be displayed blocking the content
 *
 * @param backgroundImage will be displayed in the background instead of `defaultBackgroundImage`
 *
 * @param cardStyles will override the styles for `Card` component
 *
 * @param CardProps will be the props passed to `Card` component
 *
 * @param LoaderComponent will be displayed instead of `Spinner`
 *
 * @param classes for default style overrides
 *
 * @category Component
 */
export const BrandedCardContainer: React.FC<React.PropsWithChildren<BrandedCardContainerProps>> = (props) => {
    const {
        children,
        loading,
        backgroundImage,
        cardStyles,
        CardProps,
        slots = {},
        slotProps = {},
        LoaderComponent = <Spinner visible={loading} component={slots.loader} {...slotProps.loader} />,
        classes = {},
        className: userClassName,
        ...otherProps
    } = props;
    const { background } = useInjectedUIContext();
    const theme = useTheme();
    const defaultClasses = useUtilityClasses(props);

    return (
        <Box
            sx={{
                height: '100%',
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
