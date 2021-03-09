export type RegistrationPage = {
    name: string;
    pageTitle: string;
    pageBody: JSX.Element;
    canGoForward: boolean;
    canGoBack: boolean;
};

export type CustomRegistrationDetailsGroup = {
    [key: number]: {
        values: {
            [key: string]: string | number | boolean;
        };
        valid: boolean;
    };
};
