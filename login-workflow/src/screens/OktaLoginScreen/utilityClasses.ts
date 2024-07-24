import generateUtilityClass from '@mui/material/generateUtilityClass';

export type OktaLoginScreenClasses = {
    root?: string;
    projectImageWrapper?: string;
    loginButton?: string;
    contactSupportWrapper?: string;
    contactSupportLabel?: string;
    cyberSecurityBadgeWrapper?: string;
    cyberSecurityBadge?: string;
};

export type OktaLoginScreenClassKey = keyof OktaLoginScreenClasses;

export function getOktaLoginScreenUtilityClass(slot: string): string {
    return generateUtilityClass('BluiOktaLogin', slot);
}
