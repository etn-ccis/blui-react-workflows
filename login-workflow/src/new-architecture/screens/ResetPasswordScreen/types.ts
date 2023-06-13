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
    PasswordProps?: SetPasswordProps;
    showSuccessScreen?: boolean;
    slots?: ResetPasswordScreenSlots;
    slotProps?: ResetPasswordScreenSlotsProps;
};
