import { CardActionsProps, CardHeaderProps, TypographyProps } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { CardProps } from '@mui/material/Card';

export type ErrorStateProps = TypographyProps & {
    /**
     * @param message The text to display for error
     * @returns string
     */
    message?: string;
};

export type WorkflowCardBaseProps = BoxProps & {
    /**
     * @param loading Boolean value for isLoading
     * @returns boolean
     */
    loading?: boolean;

    /**
     * @param backgroundImage To display card background
     * @returns string
     */
    backgroundImage?: string;

    /**
     * @param error The error state for each workflowCard
     * @returns boolean | string
     */
    error?: boolean | string;
};

export type WorkflowCardHeaderProps = CardHeaderProps;

export type WorkflowCardInstructionProps = TypographyProps & {
    /**
     * @param instructions The text to display as instructions
     * @returns string | JSX.Element
     */
    instructions?: string | JSX.Element;

    /**
     * @param divider Whether or not to show a divider below the instructions
     * @returns boolean
     */
    divider?: boolean;
};

// type DataObject = { [key: string]: any };

export type WorkflowCardActionsProps = CardActionsProps & {
    /**
     * @param divider Boolean value to display a divider above workflow card action buttons
     * @returns boolean
     */
    divider?: boolean;

    /**
     * @param canGoNext Boolean or function that indicates whether the next button should be enabled
     * @returns boolean
     */
    canGoNext?: boolean | (() => boolean);

    /**
     * @param canGoPrevious Boolean or function that indicates whether the previous button should be enabled
     * @returns boolean
     */
    canGoPrevious?: boolean | (() => boolean);

    /**
     * @param showPrevious Boolean that indicates whether the previous button should be displayed
     * @returns boolean
     */
    showPrevious?: boolean;

    /**
     * @param showNext Boolean that indicates whether the next button should be displayed
     * @returns boolean
     */
    showNext?: boolean;

    /**
     * @param previousLabel The label to display for the previous button
     * @returns string
     */
    previousLabel?: string;

    /**
     * @param nextLabel The label to display for the next button
     * @returns string
     */
    nextLabel?: string;

    /**
     * @param onPrevious Function called when the previous button is clicked
     * @returns void
     */
    onPrevious?: (data?: { [key: string]: any }) => void;

    /**
     * @param onNext Function that is called when the next button is clicked
     * @returns void
     */
    onNext?: (data?: { [key: string]: any }) => void;

    /**
     * @param currentStep The current step in the registration workflow
     * @returns number
     */
    currentStep?: number;

    /**
     * @param totalSteps The total number of steps in the registration workflow
     * @returns number
     */
    totalSteps?: number;

    /**
     * @param fullWidthButton Boolean that indicates whether a button should be full width
     * @returns boolean
     */
    fullWidthButton?: boolean;
};

export type WorkflowCardProps = {
    CardProps?: CardProps;
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};
