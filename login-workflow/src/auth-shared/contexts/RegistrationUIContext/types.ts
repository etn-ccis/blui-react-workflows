/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */

import { RegistrationUIState } from './state';
import { RegistrationUIActions } from '../AuthUIContextProvider';
import { RegistrationActions } from './dispatchActions';

export type RegistrationUIContextActions = {
    actions: RegistrationUIActions;
    dispatch: React.Dispatch<RegistrationActions>;
};

export type RegistrationUIReducer = (
    prevState: RegistrationUIState,
    action: RegistrationActions
) => RegistrationUIState;
