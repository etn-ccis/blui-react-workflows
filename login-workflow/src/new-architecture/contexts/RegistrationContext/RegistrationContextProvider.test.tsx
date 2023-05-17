import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegistrationContextProvider } from './provider';
import { useRegistrationContext } from './context';
import { RegistrationContextProviderProps } from './types';
import { renderHook } from '@testing-library/react-hooks';
import { useTranslation } from 'react-i18next';
import { i18nRegistrationInstance } from './i18nRegistrationInstance';

afterEach(cleanup);

const defaultProps = {
    language: 'en',
    i18n: i18nRegistrationInstance,
    navigate: (): void => {},
    routeConfig: {},
};

describe('RegistrationContextProvider', () => {
    it('should render RegistrationContextProvider without crashing', () => {
        render(<RegistrationContextProvider {...defaultProps}>Hello Registration</RegistrationContextProvider>);

        expect(screen.getByText('Hello Registration')).toBeInTheDocument();
    });

    it('should set values in the context', async () => {
        let values: {
            result: { current: RegistrationContextProviderProps };
        };

        const RegisterComponent: React.FC<React.PropsWithChildren<any>> = () => (
            <RegistrationContextProvider {...defaultProps} />
        );

        const CustomFlow: React.FC = () => {
            const Screen1: React.FC = () => {
                // eslint-disable-next-line
                values = renderHook((): RegistrationContextProviderProps => useRegistrationContext());
                return <div>Screen 1</div>;
            };

            return (
                <RegisterComponent>
                    <Screen1 />
                </RegisterComponent>
            );
        };

        render(<CustomFlow />);
        // eslint-disable-next-line
        await ((): void => expect(values.result.current.language).toBe('en'));
    });

    it('should read values from the context', async () => {
        let values: {
            result: { current: RegistrationContextProviderProps };
        };

        const RegisterComponent: React.FC<React.PropsWithChildren<any>> = () => (
            <RegistrationContextProvider {...defaultProps} />
        );

        const CustomFlow: React.FC = () => {
            const Screen1: React.FC = () => {
                // eslint-disable-next-line
                values = renderHook((): RegistrationContextProviderProps => useRegistrationContext());
                return <div>Screen 1</div>;
            };

            return (
                <RegisterComponent>
                    <Screen1 />
                </RegisterComponent>
            );
        };

        render(<CustomFlow />);
        // eslint-disable-next-line
        await ((): void => expect(values.result.current.language).toBe('en'));
    });

    it('should render multiple children', () => {
        render(
            <RegistrationContextProvider {...defaultProps}>
                <div>Child 1</div>
                <div>Child 2</div>
            </RegistrationContextProvider>
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('should display correct language translations', async () => {
        const RegisterComponent: React.FC<React.PropsWithChildren> = () => (
            <RegistrationContextProvider {...defaultProps} />
        );

        const CustomFlow: React.FC = () => {
            const Screen1: React.FC = () => {
                const { t } = useTranslation();

                // eslint-disable-next-line
                renderHook((): RegistrationContextProviderProps => useRegistrationContext());
                return <div>{t('bluiRegistration:REGISTRATION.EULA.LOADING')}</div>;
            };

            return (
                <RegisterComponent>
                    <Screen1 />
                </RegisterComponent>
            );
        };

        render(<CustomFlow />);
        // eslint-disable-next-line
        await ((): void => expect(screen.getByText('Loading End User License Agreement...')).toBeInTheDocument());
    });
});
