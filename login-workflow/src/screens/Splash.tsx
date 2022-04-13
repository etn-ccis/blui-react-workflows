import React from 'react';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { BrandedCardContainer } from '../components';
import CircularProgress from '@mui/material/CircularProgress';

type SplashProps = {
    mainImage?: string | number;
};

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            flex: '1 1 0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        image: {
            maxWidth: '100%',
            maxHeight: 80,
        },
    })
);

/**
 * Renders the splash screen displayed while loading the initial
 * authentication state.
 *
 * @param mainImage the product logo or image to use on the loading screen
 *
 * @category Component
 */
export const Splash: React.FC<React.PropsWithChildren<SplashProps>> = (props) => {
    const { mainImage } = props;
    const theme = useTheme();
    const classes = useStyles();

    return (
        <BrandedCardContainer>
            <CardContent className={classes.content}>
                {mainImage && (
                    <div style={{ paddingBottom: theme.spacing(6) }}>
                        <img src={`${mainImage}`} className={classes.image} alt="product logo" />
                    </div>
                )}
                <CircularProgress size={mainImage ? 40 : 70} variant={'indeterminate'} />
            </CardContent>
        </BrandedCardContainer>
    );
};
