import React from 'react';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';

export const WorkflowCardBody: React.FC<CardContentProps> = (props) => {
    const theme = useTheme();
    const { children, ...cardContentProps } = props;

    return (
        <>
            <CardContent
                sx={{
                    flex: '1 1 0px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    p: `${theme.spacing(2)} ${theme.spacing(3)}`,
                    [theme.breakpoints.down('sm')]: {
                        p: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)}`,
                    },
                }}
                {...cardContentProps}
            >
                {children}
            </CardContent>
        </>
    );
};
