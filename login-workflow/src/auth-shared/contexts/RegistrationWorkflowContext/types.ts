/**
 * @packageDocumentation
 * @module RegistrationWorkflowContext
 */

export type RegistrationWorkflowContextProviderProps = {
    currentScreen: number;
    totalScreens: number;
    nextScreen: (data: Record<string, unknown>) => void;
    previousScreen: (data: Record<string, unknown>) => void;
    screenData: Record<string, unknown>;
};
