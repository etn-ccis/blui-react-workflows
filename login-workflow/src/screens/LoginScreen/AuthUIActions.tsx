/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthUIActions } from '../../contexts';

type AuthUIActionsFunction = () => AuthUIActions;

export const ProjectAuthUIActions: AuthUIActionsFunction = (): any => ({
    initiateSecurity: (): Promise<void> => Promise.resolve(),
    logIn: (email: string, password: string, rememberMe: boolean): Promise<void> => Promise.resolve(),
    forgotPassword: (email: string): Promise<void> => Promise.resolve(),
    verifyResetCode: (code: string, email?: string): Promise<void> => Promise.resolve(),
    setPassword: (code: string, password: string, email?: string): Promise<void> => Promise.resolve(),
    changePassword: (oldPassword: string, newPassword: string): Promise<void> => Promise.resolve(),
});
