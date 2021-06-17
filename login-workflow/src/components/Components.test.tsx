import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrandedCardContainer } from './BrandedCardContainer';
import { FinishState } from './FinishState';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { PrivateRoute } from './PrivateRoute';
import { BrowserRouter } from 'react-router-dom';
import { SecureTextField } from './SecureTextField';
import { SimpleDialog } from './SimpleDialog';
import { Spinner } from './Spinner';
import { ChangePasswordForm, PasswordRequirements, PasswordRequirementsCheck, ChangePasswordModal } from './password';
import {
    AuthUIContextProvider,
    SecurityContextProvider,
    AccountUIActionContext,
    translations,
} from '@pxblue/react-auth-shared';

Enzyme.configure({ adapter: new Adapter() });

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'pxb-auth-i18nextLng',
        },
        whitelist: ['en'],
        ns: ['app', 'pxb'],
        defaultNS: 'app',
        fallbackNS: 'pxb',
        resources: {
            en: {
                pxb: translations.english.translation,
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
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <BrandedCardContainer loading={false} />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('FinishState tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FinishState icon={<CheckCircle color={'primary'} />} title={`Test Title`} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@pxblue/react-auth-shared', () => ({
    ...jest.requireActual('@pxblue/react-auth-shared'),
    useSecurityState: jest.fn().mockReturnValue({ isAuthenticatedUser: false }),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockReturnValue('test-location'),
}));

describe('PrivateRoute unauthenticated tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <PrivateRoute authRoute={null} />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@pxblue/react-auth-shared', () => ({
    ...jest.requireActual('@pxblue/react-auth-shared'),
    useSecurityState: jest.fn().mockReturnValue({ isAuthenticatedUser: true }),
}));

describe('PrivateRoute authenticated tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <PrivateRoute authRoute={null} />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('SecureTextField tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SecureTextField />, div);
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
            <SimpleDialog title={'test title'} body={'test body'} open={true} onClose={(): void => {}} />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('Spinner tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Spinner />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('ChangePasswordForm tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <ChangePasswordForm onPasswordChange={(): void => {}} />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@pxblue/react-auth-shared', () => ({
    ...jest.requireActual('@pxblue/react-auth-shared'),
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
            <SecurityContextProvider>
                <AccountUIActionContext.Provider value={{ actions: authActions, dispatch: authDispatch }}>
                    <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                        <ChangePasswordModal />
                    </AuthUIContextProvider>
                </AccountUIActionContext.Provider>
            </SecurityContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@pxblue/react-auth-shared', () => ({
    ...jest.requireActual('@pxblue/react-auth-shared'),
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
            <SecurityContextProvider>
                <AccountUIActionContext.Provider value={{ actions: authActions, dispatch: authDispatch }}>
                    <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                        <ChangePasswordModal />
                    </AuthUIContextProvider>
                </AccountUIActionContext.Provider>
            </SecurityContextProvider>,
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
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <PasswordRequirements passwordText={'Test@123'} />
            </AuthUIContextProvider>,
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
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <PasswordRequirementsCheck label={'test label'} isChecked={false} />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
