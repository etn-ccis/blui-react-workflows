import { SetPasswordProps } from '../../components';
import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type CreatePasswordScreenProps = WorkflowCardProps & {
    /**
     * @param PasswordProps The title for the screen
     * @returns SetPasswordProps
     */
    PasswordProps?: SetPasswordProps;

    /**
     * @param errorDisplayConfig The configuration for customizing how errors are displayed
     * @returns ErrorManagerProps
     */
    errorDisplayConfig?: ErrorManagerProps;
};
