import { CardActionsProps, CardHeaderProps, TypographyProps } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { CardProps } from '@mui/material/Card';
import { ReactNode } from 'react';

export type ErrorStateProps = TypographyProps & {
    message?: string;
};

export type WorkflowCardBaseProps = BoxProps & {
    loading?: boolean;
    backgroundImage?: string; // card background
    error?: boolean | string; // each screen should have an error state
    CardProps?: CardProps;
    LoaderComponent?: ReactNode;
    slots?: { card?: React.ElementType; loader?: React.ElementType };
};

export type WorkflowCardHeaderProps = CardHeaderProps;

export type WorkflowCardInstructionProps = Omit<TypographyProps, 'children'> & {
    instructions?: string;
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

export type WorkflowCardProps = CardProps &
    WorkflowCardHeaderProps &
    WorkflowCardInstructionProps &
    WorkflowCardActionsProps &
    WorkflowCardBaseProps;
