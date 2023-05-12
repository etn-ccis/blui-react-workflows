import React from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { WorkflowCardInstructionProps } from './WorkflowCard.types';

export const WorkflowCardInstructions: React.FC<WorkflowCardInstructionProps> = (props) => {
    const { instructions, divider, sx, ...cardInstructionProps } = props;

    return (
        <>
            <Typography {...cardInstructionProps}>{instructions}</Typography>
            {divider ? (
                <Divider
                    sx={[
                        {
                            mt: 5,
                            mb: 4,
                            mx: { md: -3, sm: -2 },
                        },
                        ...(Array.isArray(sx) ? sx : [sx]),
                    ]}
                />
            ) : null}
        </>
    );
};
