import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AcceptEula } from './subScreens/AcceptEula';
import { AccountDetails } from './subScreens/AccountDetails';
import { CreateAccount } from './subScreens/CreateAccount';
import { CreatePassword } from './subScreens/CreatePassword';
import { ExistingAccountComplete } from './subScreens/ExistingAccountComplete';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { VerifyEmail } from './subScreens/VerifyEmail';
import { AuthUIContextProvider } from '@pxblue/react-auth-shared';

Enzyme.configure({ adapter: new Adapter() });

// @TODO: register useLanguageLocale
// console.warn > react-i18next:: You will need to pass in an i18next instance by using initReactI18next

// jest.mock('@pxblue/react-auth-shared', () => ({
//     ...jest.requireActual('@pxblue/react-auth-shared'),
//     useLanguageLocale: jest.fn().mockReturnValue(() => {}),
// }));

// jest.mock('../assets/images/background.svg', () => 'https://picsum.photos/200');

describe('AcceptEula tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onEulaChanged = jest.fn();
        ReactDOM.render(
            <AcceptEula eulaAccepted={false} loadEula={(): void => {}} onEulaChanged={onEulaChanged} />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('AccountDetails tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onDetailsChanged = jest.fn();
        ReactDOM.render(<AccountDetails onDetailsChanged={onDetailsChanged} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('CreateAccount tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onEmailChanged = jest.fn();
        ReactDOM.render(<CreateAccount onEmailChanged={onEmailChanged} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('CreatePassword tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onPasswordChanged = jest.fn();
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <CreatePassword onPasswordChanged={onPasswordChanged} />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('ExistingAccountComplete tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ExistingAccountComplete />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('RegistrationComplete tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <RegistrationComplete
                firstName={'Betty'}
                lastName={'White'}
                email={'potentiallyImmortal@email.com'}
                organization={'Not Your Typical Granny Inc.'}
            />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('VerifyEmail tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onVerifyCodeChanged = jest.fn();
        const onResendVerificationEmail = jest.fn();
        ReactDOM.render(
            <VerifyEmail
                onVerifyCodeChanged={onVerifyCodeChanged}
                onResendVerificationEmail={onResendVerificationEmail}
            />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
