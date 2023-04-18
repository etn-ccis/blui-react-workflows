import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export type StepperCardClasses = {
    root?: string;
    card?: string;
};

export type StepperCardClassKey = keyof StepperCardClasses;

export function getStepperCardUtilityClass(slot: string): string {
    return generateUtilityClass('BluiStepperCard', slot);
}

const stepperCardClasses: StepperCardClasses = generateUtilityClasses('BluiStepperCard', ['root', 'card']);

export default stepperCardClasses;
