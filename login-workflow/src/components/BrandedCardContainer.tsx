import React from 'react';
import { Card, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../assets/images/background.svg';

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

export const BrandedCardContainer: React.FC = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.brandingPanel}>
            <Card className={classes.card}>{props.children}</Card>
        </div>
    );
};
