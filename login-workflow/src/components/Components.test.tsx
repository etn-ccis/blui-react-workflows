import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { BrandedCardContainer } from './BrandedCardContainer';
// import backgroundImage from '../assets/images/background.svg';
import { FinishState } from './FinishState';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { PrivateRoute } from './PrivateRoute';
import { BrowserRouter } from 'react-router-dom';
import { SecureTextField } from './SecureTextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

Enzyme.configure({ adapter: new Adapter() });

// jest.mock('@pxblue/react-auth-shared', () => ({
//     ...jest.requireActual('@pxblue/react-auth-shared'),
//     useInjectedUIContext: jest.fn().mockReturnValue({ backgroundImage: 'https://picsum.photos/200' }),
// }));

// describe('BrandedCardContainer tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(<BrandedCardContainer loading={false} />, div);
//         ReactDOM.unmountComponentAtNode(div);

//         // const component = shallow(<BrandedCardContainer />);
//         // expect(component).toMatchSnapshot();
//     });
// });

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
        const secureTextField = shallow(<SecureTextField />);
        expect(secureTextField.props().type).toBe('password');
    });

    // it('shows input text on password visibility toggle', () => {
    //     const secureTextField = shallow(<SecureTextField />);
    //     const visibilityButton = secureTextField.find(Visibility);
    //     // update state
    //     // check showPassword state after toggle
    //     expect(secureTextField.props().type).toBe('text');
    // });
});
