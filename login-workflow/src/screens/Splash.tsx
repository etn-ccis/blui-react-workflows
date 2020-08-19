import React from 'react';
import { BrandedCardContainer } from '../components/BrandedCardContainer';
import { CardContent, CircularProgress } from '@material-ui/core';

export const Splash: React.FC = () => (
    <BrandedCardContainer>
        <CardContent style={{ flex: '1 1 0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={70} variant={'indeterminate'} />
        </CardContent>
    </BrandedCardContainer>
);
