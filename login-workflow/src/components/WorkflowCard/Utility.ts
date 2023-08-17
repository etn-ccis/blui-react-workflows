import generateUtilityClass from '@mui/material/generateUtilityClass';

export type WorkflowCardClasses = {
    root?: string;
    card?: string;
};

export type WorkflowCardClassKey = keyof WorkflowCardClasses;

export function getWorkflowCardUtilityClass(slot: string): string {
    return generateUtilityClass('BluiWorkflowCard', slot);
}

// For WorkflowCardActions component
// eslint-disable-next-line
export type workflowCardActionsClasses = {
    root?: string;
    nextButton?: string;
    previousButton?: string;
    stepper?: string;
};

export type WorkflowCardActionsClassKey = keyof workflowCardActionsClasses;

export function getWorkflowCardActionsUtilityClass(slot: string): string {
    return generateUtilityClass('BluiWorkflowCardActions', slot);
}
