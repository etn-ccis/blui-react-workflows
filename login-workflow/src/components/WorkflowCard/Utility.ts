import generateUtilityClass from '@mui/material/generateUtilityClass';

export type WorkflowCardClasses = {
    /**
     * The class name for the root element.
     */
    root?: string;

    /**
     * The class name for the card element.
     */
    card?: string;
};

export type WorkflowCardClassKey = keyof WorkflowCardClasses;

export function getWorkflowCardUtilityClass(slot: string): string {
    return generateUtilityClass('BluiWorkflowCard', slot);
}

// For WorkflowCardActions component
export type workflowCardActionsClasses = {
    /**
     * The class name for the root element.
     */
    root?: string;

    /**
     * The class name for the next button element.
     */
    nextButton?: string;

    /**
     * The class name for the previous button element.
     */
    previousButton?: string;

    /**
     * The class name for the stepper element.
     */
    stepper?: string;
};

export type WorkflowCardActionsClassKey = keyof workflowCardActionsClasses;

export function getWorkflowCardActionsUtilityClass(slot: string): string {
    return generateUtilityClass('BluiWorkflowCardActions', slot);
}
