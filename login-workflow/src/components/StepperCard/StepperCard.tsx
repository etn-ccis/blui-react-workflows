import React, { ReactNode } from 'react';
import Card, { CardProps as CardPropsType } from '@mui/material/Card';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { Spinner } from '../Spinner';
import defaultBackgroundImage from '../../assets/images/background.svg';
import { useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import Box, { BoxProps } from '@mui/material/Box';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { getStepperCardUtilityClass, StepperCardClassKey, StepperCardClasses } from './StepperCardClasses';
import { cx } from '@emotion/css';

export type StepperCardProps = BoxProps & {
    loading?: boolean;
    backgroundImage?: string;
    cardStyles?: SxProps<Theme>;
    CardProps?: CardPropsType;
    loaderComponent?: ReactNode;
    classes?: StepperCardClasses;
};

const useUtilityClasses = (ownerState: StepperCardProps): Record<StepperCardClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        card: ['card'],
    };

    return composeClasses(slots, getStepperCardUtilityClass, classes);
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
 * @param loaderComponent will be displayed instead of `Spinner`
 *
 * @param classes for default style overrides
 *
 * @category Component
 */
export const StepperCard: React.FC<React.PropsWithChildren<StepperCardProps>> = (props) => {
    const {
        children,
        loading,
        backgroundImage,
        cardStyles,
        CardProps,
        loaderComponent = <Spinner visible={loading} />,
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
                {...CardProps}
            >
                {loaderComponent}
                {children}
            </Card>
        </Box>
    );
};
