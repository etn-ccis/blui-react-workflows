import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegistrationContextProvider } from './provider';
import { useRegistrationContext } from './context';
import { RegistrationContextProviderProps } from './types';
import { renderHook } from '@testing-library/react-hooks';
import { i18nRegistrationInstance } from './i18nRegistrationInstance';

afterEach(cleanup);

export const defaultProps: RegistrationContextProviderProps = {
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

    it('should read values from the context', () => {
        const wrapper = ({ children }): JSX.Element => (
            <RegistrationContextProvider {...defaultProps}>{children}</RegistrationContextProvider>
        );
        const { result } = renderHook(() => useRegistrationContext(), { wrapper });

        expect(result.current.language).toBe('en');
    });

    it('should set values in the context', () => {
        const wrapper = ({ children }): JSX.Element => (
            <RegistrationContextProvider {...defaultProps} language="es">
                {children}
            </RegistrationContextProvider>
        );
        const { result } = renderHook(() => useRegistrationContext(), { wrapper });

        expect(result.current.language).not.toBe('en');
        expect(result.current.language).toBe('es');
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
});
