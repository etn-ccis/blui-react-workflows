import React from 'react';
import CardActions from '@mui/material/CardActions';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { WorkflowCardActionsProps } from './WorkflowCard.types';
import { getWorkflowCardActionsUtilityClass, WorkflowCardActionsClassKey } from './Utility';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

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

/**
 * Component that renders the workflow card action elements used for all screen components.
 *
 * @param {WorkflowCardActionsProps} props - props of workflowCardAction component
 *
 * @category Component
 */

export const WorkflowCardActions: React.FC<WorkflowCardActionsProps> = (props) => {
    const {
        divider = true,
        canGoPrevious,
        showPrevious,
        previousLabel,
        onPrevious,
        canGoNext,
        showNext,
        nextLabel,
        onNext,
        currentStep,
        totalSteps = 5,
        fullWidthButton,
        sx,
        ...otherCardActionsProps
    } = props;
    const defaultClasses = useUtilityClasses(props);

    const showStepperDots = currentStep !== undefined && totalSteps !== undefined && !fullWidthButton;

    return (
        <>
            {divider ? (
                <Divider
                    sx={{
                        width: { md: 'calc(100% + 3rem)', sm: 'calc(100% + 2rem)', xs: 'calc(100% + 2rem)' },
                        mx: { md: -3, sm: -2 },
                    }}
                />
            ) : null}

            <CardActions
                sx={[
                    { flexDirection: 'column', justifyContent: 'flex-end', p: { xs: 2, md: 3 } },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
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
                        ) : (
                            <Box sx={{ width: fullWidthButton ? 0 : 100 }} />
                        )
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
                        ) : (
                            <Box sx={{ width: fullWidthButton ? 0 : 100 }} />
                        )
                    }
                    sx={{
                        background: 'transparent',
                        width: '100%',
                        p: 0,
                        '& .MuiMobileStepper-dot': showStepperDots ? { my: 0, mx: 0.5 } : { display: 'none' },
                    }}
                    className={defaultClasses.stepper}
                    data-testid={defaultClasses.stepper}
                />
            </CardActions>
        </>
    );
};
