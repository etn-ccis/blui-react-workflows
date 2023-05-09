export type RegistrationWorkflowContextProps = {
    currentScreen: number;
    totalScreens: number;
    nextScreen: (data: {}) => void;
    previousScreen: (data: {}) => void;
    screenData: {};
};
