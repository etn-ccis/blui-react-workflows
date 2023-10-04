import React from 'react';
import { render, cleanup, screen, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorContextProvider } from './provider';
import { ErrorContextProviderProps } from './types';
import { useErrorContext } from '.';

afterEach(cleanup);

export const errorContextProviderProps: ErrorContextProviderProps = {
    mode: 'dialog',
};

describe('ErrorContextProvider', () => {
    it('should render ErrorContextProvider without crashing', () => {
        render(<ErrorContextProvider {...errorContextProviderProps}>Error</ErrorContextProvider>);

        expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('should read values from the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <ErrorContextProvider {...errorContextProviderProps}>{children}</ErrorContextProvider>
        );
        const { result } = renderHook(() => useErrorContext(), { wrapper });

        expect(result.current.mode).toBe('dialog');
    });

    it('should set values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <ErrorContextProvider {...errorContextProviderProps} mode="message-box">
                {children}
            </ErrorContextProvider>
        );
        const { result } = renderHook(() => useErrorContext(), { wrapper });

        expect(result.current.mode).not.toBe('dialog');
        expect(result.current.mode).toBe('message-box');
    });
});
