import React, { PropsWithChildren } from 'react';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';

export const WorkflowCardBody: React.FC<PropsWithChildren> = (props) => {
    const theme = useTheme();
    const { children } = props;

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
            >
                {children}
            </CardContent>
        </>
    );
};
