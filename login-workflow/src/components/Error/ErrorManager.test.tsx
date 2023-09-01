import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, RenderResult } from '@testing-library/react';
import ErrorManager, { ErrorManagerProps } from './ErrorManager';
import {
    RegistrationContextProvider,
    RegistrationContextProviderProps,
    i18nRegistrationInstance,
} from '../../contexts';
import { RegistrationWorkflow } from '../../components';

const defaultProps: RegistrationContextProviderProps = {
    language: 'en',
    i18n: i18nRegistrationInstance,
    navigate: (): void => {},
    routeConfig: {},
};

afterEach(cleanup);

const renderer = (props?: ErrorManagerProps): RenderResult =>
    render(
        <RegistrationContextProvider {...defaultProps}>
            <RegistrationWorkflow initialScreenIndex={0}>
                <ErrorManager {...props} />
            </RegistrationWorkflow>
        </RegistrationContextProvider>
    );

describe('ErrorManager', () => {
    renderer();
    it('renders without crashing', () => {
        render(<ErrorManager error={'Error Message'} dialogConfig={{ title: 'Error Title' }} />);
        const errorManager = screen.getByText('Error Message');
        expect(errorManager).toBeInTheDocument();
    });
});
