import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export type ContactSupportSubscreenClasses = {
    /** Styles applied to the card header. */
    cardHeader?: string;
    /** Styles applied to the card content. */
    cardContent?: string;
    /** Styles applied to the card actions. */
    cardActions?: string;
};

export type ContactSupportSubscreenClassKey = keyof ContactSupportSubscreenClasses;

export function getContactSupportSubscreenUtilityClass(slot: string): string {
    return generateUtilityClass('BluiContactSupportSubscreen', slot);
}

const contactSupportSubscreenClasses: ContactSupportSubscreenClasses = generateUtilityClasses(
    'BluiContactSupportSubscreen',
    ['cardHeader', 'cardContent', 'cardActions']
);

export default contactSupportSubscreenClasses;
