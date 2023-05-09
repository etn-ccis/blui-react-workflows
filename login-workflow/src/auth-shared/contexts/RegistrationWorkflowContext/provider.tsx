/**
 * @packageDocumentation
 * @module RegistrationWorkflowContextProvider
 */

import React, { useMemo } from 'react';
import { RegistrationWorkflowContextProps } from './types';
import { RegistrationWorkflowContext } from './context';

export const RegistrationWorkflowContextProvider: React.FC<
    React.PropsWithChildren<RegistrationWorkflowContextProps>
> = (props) => {
    // Extract the needed properties out
    // Context value will not change unless a sub function is changed
    // NOTE: When adding new props to RegistrationWorkflowContextProps be sure
    // to also add them here so the parameters are copied.
    const memoizedProps = useMemo(() => {
        const propsForContext: RegistrationWorkflowContextProps = {
            currentScreen: props.currentScreen,
            totalScreens: props.totalScreens,
            nextScreen: props.nextScreen,
            previousScreen: props.previousScreen,
            screenData: props.screenData,
        };

        return propsForContext;
    }, [props.currentScreen, props.totalScreens, props.nextScreen, props.previousScreen, props.screenData]);

    return (
        <RegistrationWorkflowContext.Provider value={memoizedProps}>
            {props.children}
        </RegistrationWorkflowContext.Provider>
    );
};
