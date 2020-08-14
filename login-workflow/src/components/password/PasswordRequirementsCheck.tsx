import React from 'react';
import { Check } from '@material-ui/icons';
import { Typography, useTheme } from '@material-ui/core';

export type PasswordRequirementsCheckProps = {
    isChecked: boolean;
    label: string;
};
export const PasswordRequirementsCheck: React.FC<PasswordRequirementsCheckProps> = (props) => {
    const { isChecked, label } = props;
    const theme = useTheme();

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Check color={isChecked ? 'primary' : 'disabled'} style={{ marginRight: theme.spacing(1) }} />
            <Typography
                variant={'subtitle2'}
                style={{ fontWeight: 400, lineHeight: 1.2, opacity: isChecked ? 0.5 : 1 }}
            >
                {label}
            </Typography>
        </div>
    );
};
