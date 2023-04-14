import React, { ReactNode } from 'react';
import Card from '@mui/material/Card';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { Spinner } from '../Spinner';
import defaultBackgroundImage from '../../assets/images/background.svg';
import { useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import Box from '@mui/material/Box';

/**
 * Component that renders a blue textured background and centers its children in the screen.
 *
 * @param children the content to render on the blue background
 *
 * @category Component
 */
export type StepperCardProps = {
    loading?: boolean;
    backgroundImage?: string;
    sx?: SxProps<Theme>;
    cardStyles?: SxProps<Theme>;
    loaderComponent?: ReactNode;
};

/**
 * Component that renders a card centered on a blue textured background.
 *
 * @param loading if true a loading spinner will be displayed blocking the content
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
            >
                {loaderComponent}
                {children}
            </Card>
        </Box>
    );
};
