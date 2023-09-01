import { CheckboxProps } from '@mui/material';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type EulaScreenProps = WorkflowCardProps & {
    // the content to render for the EULA. Can be a plain string or HTML
    eulaContent?: string | JSX.Element;

    // label for the EULA checkbox
    checkboxLabel?: string;

    // EULA checkbox props
    checkboxProps?: CheckboxProps;

    // true if the EULA should be rendered as HTML
    html?: boolean;

    // used to pre-populate the checked/unchecked checkbox when the screen loads
    initialCheckboxValue?: boolean;

    // called when the checkbox clicked
    onEulaAcceptedChange?: (accepted: boolean) => void;

    // used to configure how errors are rendered
    errorDisplayConfig?: ErrorManagerProps;

    // called when refetch button clicked
    onRefetch?: () => void;
};
