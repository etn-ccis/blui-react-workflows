import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { WorkflowCardHeaderProps } from './WorkflowCardTypes';

export const WorkflowCardHeader: React.FC<WorkflowCardHeaderProps> = (props) => {
    const { title, ...cardHeaderProps } = props;
    const theme = useTheme();

    return (
        <>
            <CardHeader
                title={<Typography variant={'h6'}>{title}</Typography>}
                sx={{
                    p: `${theme.spacing(4)} ${theme.spacing(3)} 0 ${theme.spacing(3)}`,
                    [theme.breakpoints.down('sm')]: {
                        p: `${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
                    },
                }}
                {...cardHeaderProps}
            />
        </>
    );
};
