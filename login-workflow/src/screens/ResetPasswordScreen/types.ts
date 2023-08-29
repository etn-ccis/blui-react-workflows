import { ErrorManagerProps } from '../../components/Error';
import { SetPasswordProps } from '../../components/SetPassword/types';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { SuccessScreenProps } from '../SuccessScreen';

export type ResetPasswordScreenSlots = {
    SuccessScreen?: (props?: SuccessScreenProps) => JSX.Element;
};

export type ResetPasswordScreenSlotsProps = {
    SuccessScreen?: SuccessScreenProps;
};

export type ResetPasswordScreenProps = Omit<WorkflowCardProps, 'currentStep | totalSteps'> & {
    /**
     * The props that will be passed to the SetPassword component
     */
    PasswordProps?: SetPasswordProps;

    /**
     * Boolean that determines whether to show the success screen or not
     */
    showSuccessScreen?: boolean;

    /**
     * Used for ResetPasswordScreen SuccessScreen props
     */
    slots?: ResetPasswordScreenSlots;

    /**
     * The props that will be passed to the SuccessScreen component
     */
    slotProps?: ResetPasswordScreenSlotsProps;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
