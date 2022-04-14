import React from 'react';
import Card from '@mui/material/Card';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Spinner } from './Spinner';
import backgroundImage from '../assets/images/background.svg';
import { useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
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
        },
        brandingPanel: {
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.dark,
            backgroundImage: `url(${backgroundImage})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);

/**
 * Component that renders a blue textured background and centers its children in the screen.
 *
 * @param children the content to render on the blue background
 *
 * @category Component
 */
export const BrandedBackground: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = (props) => {
    const { background } = useInjectedUIContext();
    const classes = useStyles();

    return (
        <div className={classes.brandingPanel} style={background || {}}>
            {props.children}
        </div>
    );
};

export type BrandedCardContainerProps = {
    loading?: boolean;
};

/**
 * Component that renders a card centered on a blue textured background.
 *
 * @param loading if true a loading spinner will be displayed blocking the content
 *
 * @category Component
 */
export const BrandedCardContainer: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<BrandedCardContainerProps>>
> = (props) => {
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
