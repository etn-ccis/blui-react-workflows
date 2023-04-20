import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export type AcceptEulaClasses = {
    loaderText?: string;
    eulaContent?: string;
    termsAndConditions?: string;
};

export type AcceptEulaClassKey = keyof AcceptEulaClasses;

export function getAcceptEulaUtilityClass(slot: string): string {
    return generateUtilityClass('BluiAcceptEula', slot);
}

const acceptEulaClasses: AcceptEulaClasses = generateUtilityClasses('BluiAcceptEula', [
    'loaderText',
    'eulaContent',
    'termsAndConditions',
]);

export default acceptEulaClasses;
