import React from 'react';
import Typography from '@mui/material/Typography';
import Check from '@mui/icons-material/Check';
import Box from '@mui/material/Box';

export type PasswordRequirementsCheckProps = {
    isChecked: boolean;
    label: string;
};

/**
 * Component that renders an individual password complexity line item with check indicator.
 *
 * @param isChecked True if the line item should have a blue check (false for gray)
 * @param label text to display beside the check icon
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
                    opacity: props.isChecked ? 0.5 : 1,
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};
