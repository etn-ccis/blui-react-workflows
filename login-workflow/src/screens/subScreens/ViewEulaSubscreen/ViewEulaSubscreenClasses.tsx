import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export type AcceptEulaClasses = {
    loader?: string;
    eulaContent?: string;
    termsAndConditions?: string;
};

export type AcceptEulaClassKey = keyof AcceptEulaClasses;

export function getAcceptEulaUtilityClass(slot: string): string {
    return generateUtilityClass('BluiAcceptEula', slot);
}

const acceptEulaClasses: AcceptEulaClasses = generateUtilityClasses('BluiAcceptEula', [
    'loader',
    'eulaContent',
    'termsAndConditions',
]);

export default acceptEulaClasses;
