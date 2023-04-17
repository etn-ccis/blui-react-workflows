import React, { ReactNode } from 'react';
import Card, { CardProps } from '@mui/material/Card';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { Spinner } from '../Spinner';
import defaultBackgroundImage from '../../assets/images/background.svg';
import { useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import Box from '@mui/material/Box';

export type StepperCardProps = {
    loading?: boolean;
    backgroundImage?: string;
    sx?: SxProps<Theme>;
    cardStyles?: SxProps<Theme>;
    cardProps?: CardProps;
    loaderComponent?: ReactNode;
};

/**
 * Component that renders a card centered on a blue textured background.
 *
 * @param loading if true a loading spinner will be displayed blocking the content
 *
 * @param backgroundImage will be displayed in the background instead of `defaultBackgroundImage`
 *
 * @param sx will override the styles for StepperCard root
 *
 * @param cardStyles will override the styles for `Card` component
 *
 * @param cardProps will be the props passed to `Card` component
 *
 * @param loaderComponent will be displayed instead of `Spinner`
 *
 * @category Component
 */
export const StepperCard: React.FC<React.PropsWithChildren<React.PropsWithChildren<StepperCardProps>>> = (props) => {
    const {
        children,
        loading,
        backgroundImage,
        sx,
        cardStyles,
        cardProps,
        loaderComponent = <Spinner visible={loading} />,
        ...otherProps
    } = props;
    const { background } = useInjectedUIContext();
    const theme = useTheme();

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
                ...sx,
            }}
            style={background || {}}
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
                {...cardProps}
            >
                {loaderComponent}
                {children}
            </Card>
        </Box>
    );
};
