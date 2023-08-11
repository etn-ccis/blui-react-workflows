import React from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { WorkflowCardInstructionProps } from './WorkflowCard.types';

export const WorkflowCardInstructions: React.FC<WorkflowCardInstructionProps> = (props) => {
    const { instructions, divider, ...otherProps } = props;

    return (
        <>
            {typeof instructions === 'string' ? <Typography {...otherProps}>{instructions}</Typography> : instructions}
            {divider ? <Divider sx={{ mt: 5, mb: 4, mx: { md: -3, xs: -2 } }} /> : null}
        </>
    );
};