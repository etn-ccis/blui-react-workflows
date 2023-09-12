import React from 'react';
import CardActions from '@mui/material/CardActions';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { WorkflowCardActionsProps } from './WorkflowCard.types';
import { getWorkflowCardActionsUtilityClass, WorkflowCardActionsClassKey } from './Utility';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

/**
 * Component that renders the workflow card action elements used for all screen components.
 *
 * @param divider boolean value to display a divider above workflow card action buttons
 * @param canGoNext boolean or function that indicates whether the next button should be enabled
 * @param canGoPrevious boolean or function that indicates whether the previous button should be enabled
 * @param showPrevious boolean that indicates whether the previous button should be displayed
 * @param showNext boolean that indicates whether the next button should be displayed
 * @param previousLabel label to display for the previous button
 * @param nextLabel label to display for the next button
 * @param onPrevious function called when the previous button is clicked
 * @param onNext function that is called when the next button is clicked
 * @param currentStep current step in the registration workflow
 * @param totalSteps total number of steps in the registration workflow
 * @param fullWidthButton boolean that indicates whether a button should be full width
 *
 * @category Component
 */

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
        divider = false,
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
