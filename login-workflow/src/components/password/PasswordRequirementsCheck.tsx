import React from 'react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Check from '@mui/icons-material/Check';

export type PasswordRequirementsCheckProps = {
    isChecked: boolean;
    label: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        check: {
            marginRight: theme.spacing(1),
        },
        label: {
            fontWeight: 400,
            lineHeight: 1.2,
            opacity: (props: PasswordRequirementsCheckProps): number => (props.isChecked ? 0.5 : 1),
        },
    })
);

/**
 * Component that renders an individual password complexity line item with check indicator.
 *
 * @param isChecked True if the line item should have a blue check (false for gray)
 * @param label text to display beside the check icon
 *
 * @category Component
 */
export const PasswordRequirementsCheck: React.FC<React.PropsWithChildren<React.PropsWithChildren<PasswordRequirementsCheckProps>>> = (props) => {
    const { isChecked, label } = props;
    const classes = useStyles(props);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Check color={isChecked ? 'primary' : 'disabled'} className={classes.check} />
            <Typography variant={'subtitle2'} className={classes.label}>
                {label}
            </Typography>
        </div>
    );
};
