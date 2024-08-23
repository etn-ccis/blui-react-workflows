import React from 'react';
import { render, cleanup, screen, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OktaAuthContextProvider } from './provider';
import { useOktaAuthContext } from '.';
import { authContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('OktaAuthContextProvider', () => {
    it('should render OktaAuthContextProvider without crashing', () => {
        render(<OktaAuthContextProvider {...authContextProviderProps}>Hello Auth</OktaAuthContextProvider>);

        expect(screen.getByText('Hello Auth')).toBeInTheDocument();
    });

    it('should read values from the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <OktaAuthContextProvider {...authContextProviderProps}>{children}</OktaAuthContextProvider>
        );
        const { result } = renderHook(() => useOktaAuthContext(), { wrapper });

        expect(result.current.language).toBe('en');
    });

    it('should set values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <OktaAuthContextProvider {...authContextProviderProps} language="es">
                {children}
            </OktaAuthContextProvider>
        );
        const { result } = renderHook(() => useOktaAuthContext(), { wrapper });

        expect(result.current.language).not.toBe('en');
        expect(result.current.language).toBe('es');
    });

    it('should render multiple children', () => {
        render(
            <OktaAuthContextProvider {...authContextProviderProps}>
                <div>Child 1</div>
                <div>Child 2</div>
            </OktaAuthContextProvider>
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
});
