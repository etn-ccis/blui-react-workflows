import { CardActionsProps, CardHeaderProps, TypographyProps } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { CardProps } from '@mui/material/Card';

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
    onPrevious?: () => void;
    onNext?: () => void;
    currentStep?: number;
    totalSteps?: number;
    fullWidthButton?: boolean;
};

export type WorkflowCardProps = {
    CardProps?: CardProps;
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};
