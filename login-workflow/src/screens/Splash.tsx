import React from 'react';
import { BrandedCardContainer } from '../components/BrandedCardContainer';
import { CardContent, CircularProgress, useTheme } from '@material-ui/core';

type SplashProps = {
    mainImage?: string | number;
};

export const Splash: React.FC<SplashProps> = (props) => {
    const { mainImage } = props;
    const theme = useTheme();

    return (
        <BrandedCardContainer>
            <CardContent
                style={{
                    flex: '1 1 0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                {mainImage && (
                    <div style={{ paddingBottom: theme.spacing(6) }}>
                        <img style={{ maxWidth: '100%', maxHeight: 80 }} src={`${mainImage}`} alt="product logo" />
                    </div>
                )}
                <CircularProgress size={mainImage ? 40 : 70} variant={'indeterminate'} />
            </CardContent>
        </BrandedCardContainer>
    );
};
