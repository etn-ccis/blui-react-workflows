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
     * @param PasswordProps The props that will be passed to the SetPassword component
     * @returns SetPasswordProps
     */
    PasswordProps?: SetPasswordProps;

    /**
     * @param showSuccessScreen Boolean that determines whether to show the success screen or not
     * @returns boolean
     */
    showSuccessScreen?: boolean;

    /**
     * @param slots Used for ResetPasswordScreen SuccessScreen props
     * @returns ResetPasswordScreenSlots
     */
    slots?: ResetPasswordScreenSlots;

    /**
     * @param slotProps The props that will be passed to the SuccessScreen component
     * @returns ResetPasswordScreenSlotsProps
     */
    slotProps?: ResetPasswordScreenSlotsProps;

    /**
     * @param errorDisplayConfig The configuration for customizing how errors are displayed
     * @returns ErrorManagerProps
     */
    errorDisplayConfig?: ErrorManagerProps;
};
