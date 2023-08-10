/**
 * @packageDocumentation
 * @module ErrorContextProvider
 */

import React from 'react';
import { ErrorContextProviderProps } from './types';
import { ErrorContext } from './context';

export const ErrorContextProvider: React.FC<React.PropsWithChildren<ErrorContextProviderProps>> = (props) => {
    const { children, ...ErrorContextProps } = props;

    return <ErrorContext.Provider value={ErrorContextProps}>{children}</ErrorContext.Provider>;
};
