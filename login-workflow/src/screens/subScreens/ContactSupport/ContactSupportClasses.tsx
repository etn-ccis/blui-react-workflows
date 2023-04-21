import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export type ContactSupportClasses = {
    /** Styles applied to the card header. */
    cardHeader?: string;
    /** Styles applied to the card content. */
    cardContent?: string;
    /** Styles applied to the card actions. */
    cardActions?: string;
};

export type ContactSupportClassKey = keyof ContactSupportClasses;

export function getContactSupportUtilityClass(slot: string): string {
    return generateUtilityClass('BluiContactSupport', slot);
}

const contactSupportClasses: ContactSupportClasses = generateUtilityClasses('BluiContactSupport', [
    'cardHeader',
    'cardContent',
    'cardActions',
]);

export default contactSupportClasses;
