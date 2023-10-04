import React from 'react';
import { render, cleanup, screen, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContextProvider } from './provider';
import { useAuthContext } from '.';
import { authContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('AuthContextProvider', () => {
    it('should render AuthContextProvider without crashing', () => {
        render(<AuthContextProvider {...authContextProviderProps}>Hello Auth</AuthContextProvider>);

        expect(screen.getByText('Hello Auth')).toBeInTheDocument();
    });

    it('should read values from the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <AuthContextProvider {...authContextProviderProps}>{children}</AuthContextProvider>
        );
        const { result } = renderHook(() => useAuthContext(), { wrapper });

        expect(result.current.language).toBe('en');
    });

    it('should set values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <AuthContextProvider {...authContextProviderProps} language="es">
                {children}
            </AuthContextProvider>
        );
        const { result } = renderHook(() => useAuthContext(), { wrapper });

        expect(result.current.language).not.toBe('en');
        expect(result.current.language).toBe('es');
    });

    it('should render multiple children', () => {
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <div>Child 1</div>
                <div>Child 2</div>
            </AuthContextProvider>
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
});
