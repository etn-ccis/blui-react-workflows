import {
    BoxProps,
    Button,
    Card,
    CardActions,
    CardActionsProps,
    CardContent,
    CardContentProps,
    CardHeader,
    CardHeaderProps,
    CardProps,
    CircularProgress,
    MobileStepper,
    Stack,
    Typography,
} from '@mui/material';
import React from 'react';

type WorkflowCardBaseProps = CardProps & {
    loading?: boolean;
    background?: string; // card background
    error?: boolean | string; // each screen should have an error state
};
type WorkflowCardInstructionProps = BoxProps & {
    instructions?: string;
};
type WorkflowCardHeaderProps = CardHeaderProps & {
    title?: string;
};
type WorkflowCardBodyProps = CardContentProps;

type WorkflowCardActionsProps = CardActionsProps & {
    canGoNext?: boolean | ((data: any) => boolean);
    canGoPrevious?: boolean | ((data: any) => boolean);
    showPrevious?: boolean;
    showNext?: boolean;
    previousLabel?: string;
    nextLabel?: string;
    onPrevious?: (data?: any) => void;
    onNext?: (data?: any) => void;
    currentStep?: number;
    totalSteps?: number;
    fullWidthButton?: boolean;
};
export type WorkflowCardProps = WorkflowCardHeaderProps &
    WorkflowCardInstructionProps &
    WorkflowCardActionsProps &
    WorkflowCardBaseProps;

export const WorkflowCardHeader: React.FC<WorkflowCardHeaderProps> = (props) => {
    return <CardHeader title={props.title} />;
};

export const WorkflowCardInstructions: React.FC<WorkflowCardInstructionProps> = (props) => {
    return <Typography>{props.instructions}</Typography>;
};

export const WorkflowCardBody: React.FC<WorkflowCardBodyProps> = (props) => {
    return <CardContent sx={{ flex: '1 1 0px' }}>{props.children}</CardContent>;
};

export const WorkflowCardActions: React.FC<WorkflowCardActionsProps> = (props) => {
    return (
        <CardActions>
            <MobileStepper
                variant={'dots'}
                position={'static'}
                steps={props.totalSteps || 0}
                activeStep={props.currentStep || 0}
                backButton={
                    props.showPrevious ? (
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={props.canGoPrevious !== true}
                            onClick={() => props.onPrevious?.({ fake: 'data' })}
                            sx={{ width: props.fullWidthButton ? '100%' : 100 }}
                        >
                            {props.previousLabel}
                        </Button>
                    ) : null
                }
                nextButton={
                    props.showNext ? (
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={props.canGoNext !== true}
                            onClick={() => props.onNext?.({ fake: 'data' })}
                            sx={{ width: props.fullWidthButton ? '100%' : 100 }}
                        >
                            {props.nextLabel}
                        </Button>
                    ) : null
                }
                sx={{ width: '100%' }}
            />
        </CardActions>
    );
};
export const WorkflowCard: React.FC<WorkflowCardProps> = (props) => {
    return (
        <Stack
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ position: 'fixed', height: '100%', width: '100%', background: props.background }}
        >
            <Card
                variant={'elevation'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    height: '80%',
                    maxHeight: 1000,
                    width: '80%',
                    maxWidth: 800,
                }}
            >
                {props.loading && <CircularProgress variant={'indeterminate'} />}
                {!props.loading && <>{props.children}</>}
            </Card>
        </Stack>
    );
};