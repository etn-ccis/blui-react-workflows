import generateUtilityClass from '@mui/material/generateUtilityClass';

export type LoginScreenClasses = {
    root?: string;
    projectImageWrapper?: string;
    inputFieldsWrapper?: string;
    usernameTextField?: string;
    passwordTextField?: string;
    rememberMeLoginRowWrapper?: string;
    rememberMeWrapper?: string;
    rememberMeCheckbox?: string;
    rememberMeLabel?: string;
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

export type LoginScreenClassKey = keyof LoginScreenClasses;

export function getLoginScreenUtilityClass(slot: string): string {
    return generateUtilityClass('BluiLogin', slot);
}
