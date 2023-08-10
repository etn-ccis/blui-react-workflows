import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type ContactScreenProps = WorkflowCardProps & {
    title?: string;
    icon?: JSX.Element;
    emailSupportTitle?: string;
    emailSupportContent?: (email: string) => string | JSX.Element;
    phoneSupportTitle?: string;
    phoneSupportContent?: (phone: string) => string | JSX.Element;
    contactEmail?: string;
    contactPhone?: string;
    dismissButtonLabel?: string;
    onDismiss?: () => void;
};
