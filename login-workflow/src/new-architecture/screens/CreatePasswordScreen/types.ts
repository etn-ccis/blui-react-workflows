import { SetPasswordProps } from '../../components';
import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type CreatePasswordScreenProps = WorkflowCardProps & { PasswordProps?: SetPasswordProps, errorDisplayConfig?: ErrorManagerProps };
