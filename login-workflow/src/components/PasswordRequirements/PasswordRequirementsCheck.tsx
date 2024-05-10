import React from 'react';
import Typography from '@mui/material/Typography';
import Check from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import { PasswordRequirementsCheckProps } from './types';

/**
 * Component that renders an individual password complexity line item with check indicator.
 *
 * @param {PasswordRequirementsCheckProps} props - props of PasswordRequirementsCheck component
 *
 * @category Component
 */
export const PasswordRequirementsCheck: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<PasswordRequirementsCheckProps>>
> = (props) => {
    const { isChecked, label } = props;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Check color={isChecked ? 'primary' : 'disabled'} sx={{ mr: 1 }} />
            <Typography
                variant={'subtitle2'}
                sx={{
                    fontWeight: 400,
                    lineHeight: 1.2,
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};
