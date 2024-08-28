import generateUtilityClass from '@mui/material/generateUtilityClass';

export type OktaRedirectLoginScreenClasses = {
    root?: string;
    projectImageWrapper?: string;
    loginButtonWrapper?: string;
    loginButton?: string;
    forgotPasswordWrapper?: string;
    forgotPasswordLabel?: string;
    selfRegisterWrapper?: string;
    selfRegisterInstructionLabel?: string;
    selfRegisterLabel?: string;
    contactSupportWrapper?: string;
    contactSupportLabel?: string;
    cyberSecurityBadgeWrapper?: string;
    cyberSecurityBadge?: string;
};

export type OktaRedirectLoginScreenClassKey = keyof OktaRedirectLoginScreenClasses;

export function getOktaRedirectLoginScreenUtilityClass(slot: string): string {
    return generateUtilityClass('BluiOktaRedirectLogin', slot);
}
