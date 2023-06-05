import generateUtilityClass from '@mui/material/generateUtilityClass';

export type ContactScreenClasses = {
    root?: string;
    title?: string;
    icon?: JSX.Element;
    emailSupportTitle?: string;
    emailSupportContent?: string;
    phoneSupportTitle?: string;
    phoneSupportContent?: string;
    contactEmail?: string;
    contactPhone?: string;
    dismissButtonLabel?: string;
};

export type ContactScreenClassKey = keyof ContactScreenClasses;

export function getContactScreenUtilityClass(slot: string): string {
    return generateUtilityClass('BluiContact', slot);
}
