export type RegistrationWorkflowContextProps = {
    currentScreen: number;
    totalScreens: number;
    nextScreen: (data: Record<string, unknown>) => void;
    previousScreen: (data: Record<string, unknown>) => void;
    screenData: Record<string, unknown>;
};
