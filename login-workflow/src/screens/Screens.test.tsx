import React from 'react';
import 'regenerator-runtime/runtime';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AcceptEula } from './subScreens/AcceptEula';
import { AccountDetails } from './subScreens/AccountDetails';
import { CreateAccount } from './subScreens/CreateAccount';
import { CreatePassword } from './subScreens/CreatePassword';
import { ExistingAccountComplete } from './subScreens/ExistingAccountComplete';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { VerifyEmail } from './subScreens/VerifyEmail';
import { ContactSupportSubscreen } from './subScreens/ContactSupportSubscreen';
import {
    AccountUIActionContext,
    // AccountUIActionContext,
    AuthUIContextProvider,
    SecurityContextProvider,
    translations,
    // RegistrationActionContext,
    // RegistrationActionsCreator,
} from '@brightlayer-ui/react-auth-shared';
import { ForgotPassword } from './ForgotPassword';
// import { InviteRegistrationPager } from './InviteRegistrationPager';
import { BrowserRouter } from 'react-router-dom';
import { RoutingContext } from '../contexts/RoutingContext';
import { Login } from './Login';
import { ResetPassword } from './ResetPassword';
// import { SelfRegistrationPager } from './SelfRegistrationPager';
import { Splash } from './Splash';
// import { RoutingContext } from '../contexts/RoutingContext';
// import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as BLUIThemes from '@brightlayer-ui/react-themes';

const theme = createTheme(BLUIThemes.blue);
afterEach(cleanup);

void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'blui-auth-i18nextLng',
        },
        whitelist: ['en'],
        ns: ['app', 'blui'],
        defaultNS: 'app',
        fallbackNS: 'blui',
        resources: {
            en: {
                blui: translations.english.translation,
                app: {},
            },
        },
    });

describe('AcceptEula tests', () => {
    it('renders without crashing', () => {
        const onEulaChanged = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AcceptEula eulaAccepted={false} loadEula={(): void => {}} onEulaChanged={onEulaChanged} />
            </ThemeProvider>
        );
    });
});

describe('AccountDetails tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();
        const onDetailsChanged = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                    <AccountDetails onDetailsChanged={onDetailsChanged} />
                </AuthUIContextProvider>
            </ThemeProvider>
        );
    });
});

describe('CreateAccount tests', () => {
    it('renders without crashing', () => {
        const onEmailChanged = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <CreateAccount onEmailChanged={onEmailChanged} />
            </ThemeProvider>
        );
    });
});

describe('CreatePassword tests', () => {
    it('renders without crashing', () => {
        const onPasswordChanged = jest.fn();
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                    <CreatePassword onPasswordChanged={onPasswordChanged} />
                </AuthUIContextProvider>
            </ThemeProvider>
        );
    });
});

describe('ExistingAccountComplete tests', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <ExistingAccountComplete />
            </ThemeProvider>
        );
    });
});

describe('RegistrationComplete tests', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <RegistrationComplete
                    firstName={'Betty'}
                    lastName={'White'}
                    email={'potentiallyImmortal@email.com'}
                    organization={'Not Your Typical Granny Inc.'}
                />
            </ThemeProvider>
        );
    });
});

describe('VerifyEmail tests', () => {
    it('renders without crashing', () => {
        const onVerifyCodeChanged = jest.fn();
        const onResendVerificationEmail = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <VerifyEmail
                    onVerifyCodeChanged={onVerifyCodeChanged}
                    onResendVerificationEmail={onResendVerificationEmail}
                />
            </ThemeProvider>
        );
    });
});

describe('ContactSupportSubscreen tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                    <ContactSupportSubscreen />
                </AuthUIContextProvider>
            </ThemeProvider>
        );
    });
});

jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useAccountUIActions: jest.fn().mockReturnValue(() => {}),
}));

describe('ForgotPassword tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();
        const accountUIActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const accountUIDispatch = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AccountUIActionContext.Provider value={{ actions: accountUIActions, dispatch: accountUIDispatch }}>
                    <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                        <ForgotPassword />
                    </AuthUIContextProvider>
                </AccountUIActionContext.Provider>
            </ThemeProvider>
        );
    });
});

jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useSecurityState: jest.fn().mockReturnValue({}),
}));

describe('Login tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();
        const accountUIActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const accountUIDispatch = jest.fn();

        const defaultRoutes = {
            LOGIN: '/login',
            FORGOT_PASSWORD: '/forgot-password',
            RESET_PASSWORD: '/reset-password',
            REGISTER_INVITE: '/register/invite',
            REGISTER_SELF: '/register/create-account',
            SUPPORT: '/support',
        };

        render(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <RoutingContext.Provider value={{ routes: defaultRoutes }}>
                        <SecurityContextProvider>
                            <AccountUIActionContext.Provider
                                value={{ actions: accountUIActions, dispatch: accountUIDispatch }}
                            >
                                <AuthUIContextProvider
                                    authActions={authUIActions}
                                    registrationActions={registrationUIActions}
                                >
                                    <Login />
                                </AuthUIContextProvider>
                            </AccountUIActionContext.Provider>
                        </SecurityContextProvider>
                    </RoutingContext.Provider>
                </BrowserRouter>
            </ThemeProvider>
        );
    });
});

type QueryParams = {
    code?: string;
    email?: string;
    search?: string;
};

jest.mock('../hooks/useQueryString', () => ({
    useQueryString: (): QueryParams => ({ search: 'test-search', code: 'test', email: 'test@email.com' }),
}));

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn().mockReturnValue(jest.fn()),
    useLocation: jest.fn().mockReturnValue('test-location'),
}));

jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useRegistrationUIActions: jest.fn().mockReturnValue(() => ({
        actions: {
            loadEULA: jest.fn(),
            requestRegistrationCode: jest.fn(),
            validateUserRegistrationRequest: jest.fn(),
            completeRegistration: jest.fn(),
        },
        dispatch: jest.fn().mockReturnValue(() => {}),
    })),
}));

// @TODO: Fix "Error: Uncaught [TypeError: registrationActions.dispatch is not a function]"

// describe('InviteRegistrationPager tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         const root = createRoot(div);
//         const authUIActions = jest.fn();
//         const registrationUIActions = jest.fn();

//         const defaultRoutes = {
//             LOGIN: '/login',
//             FORGOT_PASSWORD: '/forgot-password',
//             RESET_PASSWORD: '/reset-password',
//             REGISTER_INVITE: '/register/invite',
//             REGISTER_SELF: '/register/create-account',
//             SUPPORT: '/support',
//         };

//         root.render(
//             <BrowserRouter>
//                 <RoutingContext.Provider value={{ routes: defaultRoutes }}>
//                     <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
//                         <InviteRegistrationPager />
//                     </AuthUIContextProvider>
//                 </RoutingContext.Provider>
//             </BrowserRouter>
//         );
//         root.unmount();
//     });
// });

// @TODO: Fix "Error: Uncaught [TypeError: registrationActions.dispatch is not a function]"

// describe('SelfRegistrationPager tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         const root = createRoot(div);
//         const authUIActions = jest.fn();
//         const registrationUIActions = jest.fn();

//         const defaultRoutes = {
//             LOGIN: '/login',
//             FORGOT_PASSWORD: '/forgot-password',
//             RESET_PASSWORD: '/reset-password',
//             REGISTER_INVITE: '/register/invite',
//             REGISTER_SELF: '/register/create-account',
//             SUPPORT: '/support',
//         };

//         root.render(
//             <BrowserRouter>
//                 <RoutingContext.Provider value={{ routes: defaultRoutes }}>
//                     <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
//                         <SelfRegistrationPager />
//                     </AuthUIContextProvider>
//                 </RoutingContext.Provider>
//             </BrowserRouter>
//         );
//         root.unmount();
//     });
// });

describe('Splash tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                    <Splash />
                </AuthUIContextProvider>
            </ThemeProvider>
        );
    });
});

describe('ResetPassword tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();
        const defaultRoutes = {
            LOGIN: '/login',
            FORGOT_PASSWORD: '/forgot-password',
            RESET_PASSWORD: '/reset-password',
            REGISTER_INVITE: '/register/invite',
            REGISTER_SELF: '/register/create-account',
            SUPPORT: '/support',
        };
        const authActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const authDispatch = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <RoutingContext.Provider value={{ routes: defaultRoutes }}>
                        <AccountUIActionContext.Provider value={{ actions: authActions, dispatch: authDispatch }}>
                            <AuthUIContextProvider
                                authActions={authUIActions}
                                registrationActions={registrationUIActions}
                            >
                                <ResetPassword />
                            </AuthUIContextProvider>
                        </AccountUIActionContext.Provider>
                    </RoutingContext.Provider>
                </BrowserRouter>
            </ThemeProvider>
        );
    });
});
