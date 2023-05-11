import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useLanguageLocale } from '../../../auth-shared';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

export type WorkflowCardHeaderProps = {
    title?: string;
};

export const WorkflowCardHeader: React.FC<WorkflowCardHeaderProps> = (props) => {
    const { t } = useLanguageLocale();
    const theme = useTheme();
    const { title } = props;

    const DialogTitleStyles = (theme: Theme): SxProps<Theme> => ({
        p: `${theme.spacing(4)} ${theme.spacing(3)} 0 ${theme.spacing(3)}`,
        [theme.breakpoints.down('sm')]: {
            p: `${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
        },
    });

    return (
        <>
            <CardHeader title={<Typography variant={'h6'}>{t(title)}</Typography>} sx={DialogTitleStyles(theme)} />
        </>
    );
};
