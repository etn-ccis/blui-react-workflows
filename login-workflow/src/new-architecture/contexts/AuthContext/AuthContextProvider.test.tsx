import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContextProvider } from './provider';
import { renderHook } from '@testing-library/react-hooks';
import { i18nAuthInstance } from './i18nAuthInstance';
import { AuthContextProviderProps, useAuthContext } from '.';

afterEach(cleanup);

const defaultProps: AuthContextProviderProps = {
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

    it('should read values from the context', async () => {
        const wrapper = ({ children }) => <AuthContextProvider {...defaultProps}>{children}</AuthContextProvider>;
        const { result } = renderHook(() => useAuthContext(), { wrapper });

        expect(result.current.language).toBe('en');
    });

    it('should set values in the context', async () => {
        const wrapper = ({ children }) => (
            <AuthContextProvider {...defaultProps} language="es">
                {children}
            </AuthContextProvider>
        );
        const { result } = renderHook(() => useAuthContext(), { wrapper });

        expect(result.current.language).not.toBe('en');
        expect(result.current.language).toBe('es');
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
});
