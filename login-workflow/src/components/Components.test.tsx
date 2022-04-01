import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrandedCardContainer } from './BrandedCardContainer';
import { FinishState } from './FinishState';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { AuthGuard } from './AuthGuard';
import { SecureTextField } from './SecureTextField';
import { SimpleDialog } from './SimpleDialog';
import { Spinner } from './Spinner';
import { ChangePasswordForm, PasswordRequirements, PasswordRequirementsCheck, ChangePasswordModal } from './password';
import {
    AuthUIContextProvider,
    SecurityContextProvider,
    AccountUIActionContext,
    translations,
} from '@brightlayer-ui/react-auth-shared';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as BLUIThemes from '@brightlayer-ui/react-themes';

const theme = createTheme(BLUIThemes.blue);

Enzyme.configure({ adapter: new Adapter() });

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { RouteConfig } from '../routing/AuthNavigationContainer';

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

describe('BrandedCardContainer tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                    <BrandedCardContainer loading={false} />
                </AuthUIContextProvider>
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('FinishState tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <FinishState icon={<CheckCircle color={'primary'} />} title={`Test Title`} />
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useRoutes: jest.fn().mockReturnValue({ LOGIN: 'login' }),
    useSecurityState: jest.fn().mockReturnValue({ isAuthenticatedUser: false }),
}));

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn().mockReturnValue(jest.fn()),
    useLocation: jest.fn().mockReturnValue('test-location'),
}));
jest.mock('../contexts/RoutingContext', () => ({
    useRoutes: (): { routes: RouteConfig } => ({ routes: { LOGIN: 'login' } }),
}));

describe('AuthGuard unauthenticated tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <AuthGuard></AuthGuard>
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useSecurityState: jest.fn().mockReturnValue({ isAuthenticatedUser: true }),
}));

describe('AuthGuard authenticated tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <AuthGuard></AuthGuard>
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('SecureTextField tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <SecureTextField />
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('hides input text by default', () => {
        const secureTextFieldWrapper = shallow(<SecureTextField />);
        expect(secureTextFieldWrapper.props().type).toBe('password');
    });
});

describe('SimpleDialog tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <SimpleDialog title={'test title'} body={'test body'} open={true} onClose={(): void => {}} />
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('Spinner tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <Spinner />
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('ChangePasswordForm tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                    <ChangePasswordForm onPasswordChange={(): void => {}} />
                </AuthUIContextProvider>
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useSecurityState: jest.fn().mockReturnValue({ isShowingChangePassword: true }),
    initialTransitState: jest.fn().mockReturnValue({ transitSuccess: true }),
}));

describe('ChangePasswordModal transitSuccess=true tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();
        const authActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const authDispatch = jest.fn();

        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <SecurityContextProvider>
                    <AccountUIActionContext.Provider value={{ actions: authActions, dispatch: authDispatch }}>
                        <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                            <ChangePasswordModal />
                        </AuthUIContextProvider>
                    </AccountUIActionContext.Provider>
                </SecurityContextProvider>
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useSecurityState: jest.fn().mockReturnValue({ isShowingChangePassword: true }),
    initialTransitState: jest.fn().mockReturnValue({ transitSuccess: false }),
}));

describe('ChangePasswordModal transitSuccess=false tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();
        const authActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const authDispatch = jest.fn();

        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <SecurityContextProvider>
                    <AccountUIActionContext.Provider value={{ actions: authActions, dispatch: authDispatch }}>
                        <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                            <ChangePasswordModal />
                        </AuthUIContextProvider>
                    </AccountUIActionContext.Provider>
                </SecurityContextProvider>
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('PasswordRequirements tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                    <PasswordRequirements passwordText={'Test@123'} />
                </AuthUIContextProvider>
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('PasswordRequirementsCheck tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                    <PasswordRequirementsCheck label={'test label'} isChecked={false} />
                </AuthUIContextProvider>
            </ThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
