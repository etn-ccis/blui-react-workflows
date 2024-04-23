import { ErrorManagerProps } from '../Error/types';

export type RegistrationWorkflowProps = {
    /**
     * The initial screen index to start the registration workflow from
     */
    initialScreenIndex?: number;

    /**
     * The success screen to display upon successful registration
     */
    successScreen?: JSX.Element;

    /**
     * When true verifies validateUserRegistrationRequest for verifyCode and several of the default screens will be skipped
     * not requiring user input for email and the validation code will be pulled from the url
     * @default false
     */
    isInviteRegistration?: boolean;

    /**
     * Component to display for the success screen if the account already exists.
     */
    existingAccountSuccessScreen?: JSX.Element;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
