import React from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useLanguageLocale } from '../../../auth-shared';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

export type WorkflowCardInstructionProps = {
    instructions?: string;
    divider?: boolean;
};

export const WorkflowCardInstructions: React.FC<WorkflowCardInstructionProps> = (props) => {
    const { t } = useLanguageLocale();
    const theme = useTheme();
    const { instructions, divider } = props;

    const FullDividerStyles = (theme: Theme): SxProps<Theme> => ({
        m: `${theme.spacing(5)} -${theme.spacing(3)} ${theme.spacing(4)}`,
        [theme.breakpoints.down('sm')]: {
            m: `${theme.spacing(5)} -${theme.spacing(2)} ${theme.spacing(4)}`,
        },
    });

    return (
        <>
            <Typography>{t(instructions)}</Typography>
            {divider ? <Divider sx={FullDividerStyles(theme)} /> : null}
        </>
    );
};
