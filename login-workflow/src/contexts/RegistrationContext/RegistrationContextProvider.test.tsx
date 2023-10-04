import React from 'react';
import { render, cleanup, screen, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegistrationContextProvider } from './provider';
import { useRegistrationContext } from './context';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('RegistrationContextProvider', () => {
    it('should render RegistrationContextProvider without crashing', () => {
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                Hello Registration
            </RegistrationContextProvider>
        );

        expect(screen.getByText('Hello Registration')).toBeInTheDocument();
    });

    it('should read values from the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <RegistrationContextProvider {...registrationContextProviderProps}>{children}</RegistrationContextProvider>
        );
        const { result } = renderHook(() => useRegistrationContext(), { wrapper });

        expect(result.current.language).toBe('en');
    });

    it('should set values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <RegistrationContextProvider {...registrationContextProviderProps} language="es">
                {children}
            </RegistrationContextProvider>
        );
        const { result } = renderHook(() => useRegistrationContext(), { wrapper });

        expect(result.current.language).not.toBe('en');
        expect(result.current.language).toBe('es');
    });

    it('should render multiple children', () => {
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <div>Child 1</div>
                <div>Child 2</div>
            </RegistrationContextProvider>
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
});
