import React from 'react';
import { useTheme } from '@material-ui/core'

export const Login: React.FC = (props) => {
    const theme = useTheme();
    return (
        <div style={{backgroundColor: theme.palette.primary.main, height: 50, width: 50}}/>
    )
}