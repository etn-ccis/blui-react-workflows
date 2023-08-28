import { CheckboxProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type EulaScreenProps = WorkflowCardProps & {
    /**
     * @param eulaContent The content to render for the EULA. Can be a plain string or HTML
     * @returns string | JSX.Element
     */
    eulaContent?: string | JSX.Element;

    /**
     * @param checkboxLabel The label for the EULA checkbox
     * @returns string
     */
    checkboxLabel?: string;

    /**
     * @param checkboxProps Used to set checkbox props
     * @returns CheckboxProps
     */
    checkboxProps?: CheckboxProps;

    /**
     * @param htmlEula true if the EULA should be rendered as HTML
     * @returns boolean
     */
    htmlEula?: boolean;

    /**
     * @param initialCheckboxValue Used to pre-populate the checked/unchecked checkbox when the screen loads
     * @returns boolean
     */
    initialCheckboxValue?: boolean;

    /**
     * @param onEulaAcceptedChange Called when the checkbox clicked
     * @returns boolean
     */
    onEulaAcceptedChange?: (accepted: boolean) => boolean;

    /**
     * @param errorDisplayConfig The configuration for customizing how errors are displayed
     * @returns ErrorManagerProps
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * @param onRefetch TODO Need description what this does
     * @returns void
     */
    onRefetch?: () => void;
};
