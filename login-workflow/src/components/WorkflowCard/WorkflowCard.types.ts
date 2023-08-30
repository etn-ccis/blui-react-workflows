import { CardActionsProps, CardHeaderProps, TypographyProps } from '@mui/material';
import { BoxProps } from '@mui/material/Box';

export type ErrorStateProps = TypographyProps & {
    /**
     * The text to display for error
     */
    message?: string;
};

export type WorkflowCardBaseProps = BoxProps & {
    /**
     * If true, a blocking progress spinner will be displayed over the card
     */
    loading?: boolean;

    /**
     * To display card background
     */
    backgroundImage?: string;

    /**
     * The error state for each workflowCard
     */
    error?: boolean | string;
};

export type WorkflowCardHeaderProps = CardHeaderProps;

export type WorkflowCardInstructionProps = TypographyProps & {
    /**
     * The text to display as instructions
     */
    instructions?: string | JSX.Element;

    /**
     * Whether or not to show a divider below the instructions
     */
    divider?: boolean;
};

// type DataObject = { [key: string]: any };

export type WorkflowCardActionsProps = CardActionsProps & {
    /**
     * Boolean value to display a divider above workflow card action buttons
     */
    divider?: boolean;

    /**
     * Boolean or function that indicates whether the next button should be enabled
     */
    canGoNext?: boolean | (() => boolean);

    /**
     * Boolean or function that indicates whether the previous button should be enabled
     */
    canGoPrevious?: boolean | (() => boolean);

    /**
     * Boolean that indicates whether the previous button should be displayed
     */
    showPrevious?: boolean;

    /**
     * Boolean that indicates whether the next button should be displayed
     */
    showNext?: boolean;

    /**
     * The label to display for the previous button
     */
    previousLabel?: string;

    /**
     * The label to display for the next button
     */
    nextLabel?: string;

    /**
     * Function called when the previous button is clicked
     * @param {string} key TODO here data?
     * @returns void
     */
    onPrevious?: (data?: { [key: string]: any }) => void;

    /**
     * Function that is called when the next button is clicked
     * @param {string} key TODO here data?
     * @returns void
     */
    onNext?: (data?: { [key: string]: any }) => void;

    /**
     * The current step in the registration workflow
     */
    currentStep?: number;

    /**
     * The total number of steps in the registration workflow
     */
    totalSteps?: number;

    /**
     * Boolean that indicates whether a button should be full width
     */
    fullWidthButton?: boolean;
};

export type WorkflowCardProps = {
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};
