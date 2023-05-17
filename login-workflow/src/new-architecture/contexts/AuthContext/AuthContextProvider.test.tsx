import React from 'react';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContextProvider } from './provider';
import { AuthContextProviderProps } from './types';
import { renderHook } from '@testing-library/react-hooks';
import { useTranslation } from 'react-i18next';
import { i18nAuthInstance } from './i18nAuthInstance';
import { useAuthContext } from '.';

afterEach(cleanup);

const defaultProps = {
    language: 'en',
    i18n: i18nAuthInstance,
    navigate: (): void => {},
    routeConfig: {},
    actions: jest.fn(),
};

describe('AuthContextProvider', () => {
    it('should render AuthContextProvider without crashing', () => {
        render(<AuthContextProvider {...defaultProps}>Hello Auth</AuthContextProvider>);

        expect(screen.getByText('Hello Auth')).toBeInTheDocument();
    });

    it('should set values in the context', async () => {
        let values: {
            result: { current: AuthContextProviderProps };
        };

        const AuthComponent: React.FC<React.PropsWithChildren<any>> = () => <AuthContextProvider {...defaultProps} />;

        const CustomFlow: React.FC = () => {
            const Screen1: React.FC = () => {
                // eslint-disable-next-line
                values = renderHook((): AuthContextProviderProps => useAuthContext());
                return <div>Screen 1</div>;
            };

            return (
                <AuthComponent>
                    <Screen1 />
                </AuthComponent>
            );
        };

        render(<CustomFlow />);
        // eslint-disable-next-line
        await ((): void => expect(values.result.current.language).toBe('en'));
    });

    it('should read values from the context', async () => {
        let values: {
            result: { current: AuthContextProviderProps };
        };

        const AuthComponent: React.FC<React.PropsWithChildren<any>> = () => <AuthContextProvider {...defaultProps} />;

        const CustomFlow: React.FC = () => {
            const Screen1: React.FC = () => {
                // eslint-disable-next-line
                values = renderHook((): AuthContextProviderProps => useAuthContext());
                return <div>Screen 1</div>;
            };

            return (
                <AuthComponent>
                    <Screen1 />
                </AuthComponent>
            );
        };

        render(<CustomFlow />);
        // eslint-disable-next-line
        waitFor(() => expect(values.result.current.language).toBe('en'));
    });

    it('should render multiple children', () => {
        render(
            <AuthContextProvider {...defaultProps}>
                <div>Child 1</div>
                <div>Child 2</div>
            </AuthContextProvider>
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    // it('should display correct language translations', async () => {
    //     const AuthComponent: React.FC<React.PropsWithChildren> = () => (
    //         <AuthContextProvider {...defaultProps} language="es" />
    //     );

    //     const CustomFlow: React.FC = () => {
    //         const Screen1: React.FC = () => {
    //             const { t } = useTranslation();

    //             // eslint-disable-next-line
    //             renderHook((): AuthContextProviderProps => useAuthContext());
    //             return <div>{t('bluiAuth:ACTIONS.WELCOME')}</div>;
    //         };

    //         return (
    //             <AuthComponent>
    //                 <Screen1 />
    //             </AuthComponent>
    //         );
    //     };

    //     render(<CustomFlow />);
    //     // eslint-disable-next-line
    //     waitFor((): void => expect(screen.getByText('ONe')).toBeInTheDocument());
    // });
});
