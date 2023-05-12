import React from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { WorkflowCardInstructionProps } from './WorkflowCardTypes';

export const WorkflowCardInstructions: React.FC<WorkflowCardInstructionProps> = (props) => {
    const theme = useTheme();
    const { instructions, divider, ...cardInstructionProps } = props;

    return (
        <>
            <Typography {...cardInstructionProps}>{instructions}</Typography>
            {divider ? (
                <Divider
                    sx={{
                        m: `${theme.spacing(5)} -${theme.spacing(3)} ${theme.spacing(4)}`,
                        [theme.breakpoints.down('sm')]: {
                            m: `${theme.spacing(5)} -${theme.spacing(2)} ${theme.spacing(4)}`,
                        },
                    }}
                />
            ) : null}
        </>
    );
};
