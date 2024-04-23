import React from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { WorkflowCardInstructionProps } from './WorkflowCard.types';

/**
 * Component that renders the instructions content for the workflow card.
 *
 * @param {WorkflowCardInstructionProps} props - props of workflowCardInstruction
 *
 * @category Component
 */

export const WorkflowCardInstructions: React.FC<WorkflowCardInstructionProps> = (props) => {
    const { instructions, divider = true, sx, ...otherProps } = props;

    return (
        <>
            {typeof instructions === 'string' ? (
                <Typography sx={[{ px: { md: 3, xs: 2 }, pt: 2 }, ...(Array.isArray(sx) ? sx : [sx])]} {...otherProps}>
                    {instructions}
                </Typography>
            ) : (
                instructions
            )}
            {divider ? <Divider sx={{ mt: 5, mb: 4, mx: { md: -3, xs: -2 } }} /> : null}
        </>
    );
};
