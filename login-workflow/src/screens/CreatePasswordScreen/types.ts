import { SetPasswordProps } from '../../components';
import { ErrorManagerProps } from '../../components/Error/types';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type CreatePasswordScreenProps = WorkflowCardProps & {
    /**
     * The props passed from SetPassword component
     */
    PasswordProps?: SetPasswordProps;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
