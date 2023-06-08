import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, RenderResult } from '@testing-library/react';
import { EulaScreen } from './EulaScreen';
import {
    RegistrationContextProvider,
    RegistrationContextProviderProps,
    i18nRegistrationInstance,
} from '../../contexts';
import { EulaScreenProps } from './types';
import { RegistrationWorkflow } from '../../components';
type EulaFullScreenProps = EulaScreenProps & {
    title?: string;
};
afterEach(cleanup);

const defaultProps: RegistrationContextProviderProps = {
    language: 'en',
    i18n: i18nRegistrationInstance,
    navigate: (): void => {},
    routeConfig: {},
};

describe('Eula Screen', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderer = (props?: EulaFullScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...defaultProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <EulaScreen {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('License Agreement')).toBeInTheDocument();
    });

    it('should update values when passed as props', () => {
        renderer({ title: 'Test Title' });

        expect(screen.queryByText('License Agreement')).toBeNull();
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should loader, when loading prop is passed to WorkflowCardBaseProps', () => {
        renderer({ WorkflowCardBaseProps: { loading: true } });

        expect(screen.getByText('Loading End User License Agreement...')).toBeInTheDocument();
    });
});
