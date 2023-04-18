import React from 'react';
import CardContent from '@mui/material/CardContent';
import { BrandedCardContainer } from '../components';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type SplashProps = {
    mainImage?: string | number;
};

/**
 * Renders the splash screen displayed while loading the initial
 * authentication state.
 *
 * @param mainImage the product logo or image to use on the loading screen
 *
 * @category Component
 */
export const Splash: React.FC<React.PropsWithChildren<React.PropsWithChildren<SplashProps>>> = (props) => {
    const { mainImage } = props;

    return (
        <BrandedCardContainer>
            <CardContent
                sx={{
                    flex: '1 1 0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                {mainImage && (
                    <Box sx={{ pb: 6 }}>
                        <Box
                            component="img"
                            src={`${mainImage}`}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: 80,
                            }}
                            alt="product logo"
                        />
                    </Box>
                )}
                <CircularProgress size={mainImage ? 40 : 70} variant={'indeterminate'} />
            </CardContent>
        </BrandedCardContainer>
    );
};
