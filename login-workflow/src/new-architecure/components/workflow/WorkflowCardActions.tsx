import React from 'react';
import CardActions from '@mui/material/CardActions';
import { Theme, useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { WorkflowCardActionsProps } from './WorkflowCardTypes';

export const WorkflowCardActions: React.FC<WorkflowCardActionsProps> = (props) => {
    const theme = useTheme();
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
        data,
        ...cardActionsProps
    } = props;

    const StepperDotStyles = (theme: Theme): any => ({
        m: `0px ${theme.spacing(0.5)}`,
    });

    return (
        <CardActions
            sx={{
                p: 3,
                justifyContent: 'flex-end',
                [theme.breakpoints.down('sm')]: {
                    p: 2,
                },
            }}
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
                                canGoPrevious === false || (typeof canGoPrevious === 'function' && !canGoPrevious(data))
                            }
                            onClick={(): void => onPrevious(data)}
                            sx={{ width: fullWidthButton ? '100%' : 100 }}
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
                            disabled={canGoNext === false || (typeof canGoNext === 'function' && !canGoNext(data))}
                            onClick={(): void => onNext(data)}
                            sx={{ width: fullWidthButton ? '100%' : 100 }}
                        >
                            {nextLabel}
                        </Button>
                    ) : null
                }
                sx={{
                    background: 'transparent',
                    width: '100%',
                    p: 0,
                    '& .MuiMobileStepper-dot': StepperDotStyles(theme),
                }}
            />
        </CardActions>
    );
};
