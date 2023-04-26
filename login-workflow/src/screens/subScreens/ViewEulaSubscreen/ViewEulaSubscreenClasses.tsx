import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export type ViewEulaSubscreenClasses = {
    loader?: string;
    eulaContent?: string;
    checkboxLabel?: string;
};

export type ViewEulaSubscreenClassKey = keyof ViewEulaSubscreenClasses;

export function getViewEulaSubscreenUtilityClass(slot: string): string {
    return generateUtilityClass('BluiViewEulaSubscreen', slot);
}

const viewEulaSubscreenClasses: ViewEulaSubscreenClasses = generateUtilityClasses('BluiViewEulaSubscreen', [
    'loader',
    'eulaContent',
    'checkboxLabel',
]);

export default viewEulaSubscreenClasses;
