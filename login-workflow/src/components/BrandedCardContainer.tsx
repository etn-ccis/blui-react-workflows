import React from 'react';
import { Card, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../assets/images/background.svg';
import { Spinner } from './Spinner';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: '100%',
            height: '100%',
            maxWidth: '450px',
            maxHeight: '700px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        },
        brandingPanel: {
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            backgroundImage: `url(${backgroundImage})`,
            // backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);

export const BrandedBackground: React.FC = (props) => {
    const classes = useStyles();
    return <div className={classes.brandingPanel}>{props.children}</div>;
};

export type BrandedCardContainerProps = {
    loading?: boolean;
};
export const BrandedCardContainer: React.FC<BrandedCardContainerProps> = (props) => {
    const { children, loading, ...otherProps } = props;
    const classes = useStyles();
    return (
        <BrandedBackground {...otherProps}>
            <Card className={classes.card}>
                <Spinner visible={loading} />
                {children}
            </Card>
        </BrandedBackground>
    );
};
