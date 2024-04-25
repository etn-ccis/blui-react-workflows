import { BoxProps } from '@mui/material/Box';

export type SpinnerProps = BoxProps & {
    /**
     * True if the spinner should be displayed, false to render nothing
     */
    visible?: boolean;
};
