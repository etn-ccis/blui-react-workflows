import React from 'react';
import CardActions from '@mui/material/CardActions';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { WorkflowCardActionsProps } from './WorkflowCard.types';
import { cx } from '@emotion/css';
import { getWorkflowCardActionsUtilityClass, WorkflowCardActionsClassKey } from './Utility';
import { unstable_composeClasses as composeClasses } from '@mui/base';

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
        ...cardActionsProps
    } = props;
    const defaultClasses = useUtilityClasses(props);

    return (
        <CardActions
            sx={[{ justifyContent: 'flex-end', p: { sm: 2, md: 3 } }, ...(Array.isArray(sx) ? sx : [sx])]}
            className={cx(defaultClasses.root)}
            {...cardActionsProps}
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
                            className={cx(defaultClasses.previousButton)}
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
                            className={cx(defaultClasses.nextButton)}
                        >
                            {nextLabel}
                        </Button>
                    ) : null
                }
                sx={[
                    { background: 'transparent', width: '100%', p: 0, '& .MuiMobileStepper-dot': { my: 0, mx: 0.5 } },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
                className={cx(defaultClasses.stepper)}
            />
        </CardActions>
    );
};
