import React from 'react';
import CardActions from '@mui/material/CardActions';
import { Theme, useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { useLanguageLocale } from '../../../auth-shared';

type DataObject = { [key: string]: any };

export type WorkflowCardActionsProps = {
    canGoNext?: boolean | ((data: DataObject) => boolean);
    canGoPrevious?: boolean | ((data: DataObject) => boolean);
    showPrevious?: boolean;
    showNext?: boolean;
    previousLabel?: string;
    nextLabel?: string;
    onPrevious?: (data?: any) => void;
    onNext?: (data?: any) => void;
    currentStep?: number;
    totalSteps?: number;
    fullWidthButton?: boolean;
    data?: DataObject;
};

const StepperDotStyles = (theme: Theme): any => ({
    m: `0px ${theme.spacing(0.5)}`,
});

export const WorkflowCardActions: React.FC<WorkflowCardActionsProps> = (props) => {
    const theme = useTheme();
    const { t } = useLanguageLocale();
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
    } = props;

    return (
        <CardActions
            sx={{
                p: 3,
                justifyContent: 'flex-end',
                [theme.breakpoints.down('sm')]: {
                    p: 2,
                },
            }}
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
                            {t(previousLabel)}
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
                            {t(nextLabel)}
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
