import { CardActionsProps, CardHeaderProps, TypographyProps } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { CardProps } from '@mui/material/Card';
import { SxProps, Theme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { SpinnerProps } from '../../../components/Spinner';

export type ErrorStateProps = {
    message?: string;
};

export type WorkflowCardBaseProps = BoxProps & {
    loading?: boolean;
    background?: string; // card background
    error?: boolean | string; // each screen should have an error state
    cardStyles?: SxProps<Theme>;
    CardProps?: CardProps;
    LoaderComponent?: ReactNode;
    slots?: { card?: React.ElementType; loader?: React.ElementType };
    slotProps?: {
        card?: CardProps;
        loader?: SpinnerProps;
    };
};

export type WorkflowCardHeaderProps = CardHeaderProps & {
    title?: string;
};

export type WorkflowCardInstructionProps = TypographyProps & {
    instructions?: string;
    divider?: boolean;
};

// type DataObject = { [key: string]: any };

export type WorkflowCardActionsProps = CardActionsProps & {
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
