import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type ContactSupportScreenProps = WorkflowCardProps & {
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
