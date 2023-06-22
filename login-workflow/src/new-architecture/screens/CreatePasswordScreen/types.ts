import { SetPasswordProps } from '../../components';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type CreatePasswordScreenProps = WorkflowCardProps & { PasswordProps?: SetPasswordProps };
