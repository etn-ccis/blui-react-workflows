import { CardActionsProps, CardHeaderProps, TypographyProps } from '@mui/material';
import { BoxProps } from '@mui/material/Box';

export type ErrorStateProps = TypographyProps & {
    message?: string;
};

export type WorkflowCardBaseProps = BoxProps & {
    loading?: boolean;
    backgroundImage?: string; // card background
    error?: boolean | string; // each screen should have an error state
};

export type WorkflowCardHeaderProps = CardHeaderProps;

export type WorkflowCardInstructionProps = TypographyProps & {
    instructions?: string | JSX.Element;
    divider?: boolean;
};

// type DataObject = { [key: string]: any };

export type WorkflowCardActionsProps = CardActionsProps & {
    divider?: boolean;
    canGoNext?: boolean | (() => boolean);
    canGoPrevious?: boolean | (() => boolean);
    showPrevious?: boolean;
    showNext?: boolean;
    previousLabel?: string;
    nextLabel?: string;
    onPrevious?: (data?: { [key: string]: any }) => void;
    onNext?: (data?: { [key: string]: any }) => void;
    currentStep?: number;
    totalSteps?: number;
    fullWidthButton?: boolean;
};

export type WorkflowCardProps = {
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};
