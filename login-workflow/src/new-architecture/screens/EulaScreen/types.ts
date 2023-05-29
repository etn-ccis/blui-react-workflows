import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type EulaScreenProps = WorkflowCardProps & {
    // the content to render for the EULA. Can be a plain string or HTML
    eulaContent?: React.ReactNode;

    // label for the EULA checkbox
    checkboxLabel?: string;

    // true if the EULA should be rendered as HTML
    htmlEula?: boolean;

    // used to pre-populate the checked/unchecked checkbox when the screen loads
    initialCheckboxValue?: boolean;

    // called when the checkbox clicked
    onEulaAcceptedChange?: (accepted: boolean) => boolean;
};
