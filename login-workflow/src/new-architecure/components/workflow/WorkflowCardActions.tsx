import React from 'react';
import CardActions from '@mui/material/CardActions';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { WorkflowCardActionsProps } from './WorkflowCard.types';
import { getWorkflowCardActionsUtilityClass, WorkflowCardActionsClassKey } from './Utility';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { display } from '@mui/system';

const useUtilityClasses = (ownerState: WorkflowCardActionsProps): Record<WorkflowCardActionsClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        nextButton: ['nextButton'],
        previousButton: ['previousButton'],
        stepper: ['stepper'],
    };

    return composeClasses(slots, getWorkflowCardActionsUtilityClass, classes);
};

export const WorkflowCardActions: React.FC<WorkflowCardActionsProps> = (props) => {
    const {
        canGoNext,
        canGoPrevious,
        showPrevious,
        showNext,
        previousLabel,
        nextLabel,
        onPrevious,
        onNext,
        currentStep,
        totalSteps,
        fullWidthButton,
        sx,
        ...otherCardActionsProps
    } = props;
    const defaultClasses = useUtilityClasses(props);

    const showStepperDots = currentStep !== undefined && totalSteps !== undefined && !fullWidthButton;

    return (
        <CardActions
            sx={[{ justifyContent: 'flex-end', p: { sm: 2, md: 3 } }, ...(Array.isArray(sx) ? sx : [sx])]}
            className={defaultClasses.root}
            data-testid={defaultClasses.root}
            {...otherCardActionsProps}
        >
            <MobileStepper
                variant={'dots'}
                position={'static'}
                steps={totalSteps}
                activeStep={currentStep}
                backButton={
                    showPrevious ? (
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={
                                canGoPrevious === false || (typeof canGoPrevious === 'function' && !canGoPrevious())
                            }
                            onClick={onPrevious}
                            sx={[{ width: fullWidthButton ? '100%' : 100 }, ...(Array.isArray(sx) ? sx : [sx])]}
                            className={defaultClasses.previousButton}
                            data-testid={defaultClasses.previousButton}
                        >
                            {previousLabel}
                        </Button>
                    ) : null
                }
                nextButton={
                    showNext ? (
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            disabled={canGoNext === false || (typeof canGoNext === 'function' && !canGoNext())}
                            onClick={onNext}
                            sx={[{ width: fullWidthButton ? '100%' : 100 }, ...(Array.isArray(sx) ? sx : [sx])]}
                            className={defaultClasses.nextButton}
                            data-testid={defaultClasses.nextButton}
                        >
                            {nextLabel}
                        </Button>
                    ) : null
                }
                sx={[
                    {
                        background: 'transparent',
                        width: '100%',
                        p: 0,
                        '& .MuiMobileStepper-dot': showStepperDots ? { my: 0, mx: 0.5 } : { display: 'none' },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
                className={defaultClasses.stepper}
                data-testid={defaultClasses.stepper}
            />
        </CardActions>
    );
};
