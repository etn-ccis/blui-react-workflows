import { CheckboxProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type EulaScreenProps = WorkflowCardProps & {
    /**
     * The content to render for the EULA. Can be a plain string or HTML
     */
    eulaContent?: string | JSX.Element;

    /**
     * The label for the EULA checkbox
     */
    checkboxLabel?: string;

    /**
     * Used to set checkbox props
     */
    checkboxProps?: CheckboxProps;

    /**
     * The EULA should be rendered as HTML
     * @default true
     */
    htmlEula?: boolean;

    /**
     * Used to pre-populate the checked/unchecked checkbox when the screen loads
     * @default false
     */
    initialCheckboxValue?: boolean;

    /**
     * Function called when the checkbox clicked
     * @param {boolean} accepted - verify Eula accepted
     * @returns boolean
     */
    onEulaAcceptedChange?: (accepted: boolean) => boolean;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * Function to refectch verify code for retry link
     * @returns void
     */
    onRefetch?: () => void;
};
