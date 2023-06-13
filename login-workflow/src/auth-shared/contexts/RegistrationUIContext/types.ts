/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */

import { RegistrationUIState } from './state';
import { RegistrationUIActionsLegacy } from '../AuthUIContextProvider';
import { RegistrationActions } from './dispatchActions';

export type RegistrationUIContextActions = {
    actions: RegistrationUIActionsLegacy;
    dispatch: React.Dispatch<RegistrationActions>;
};

export type RegistrationUIReducer = (
    prevState: RegistrationUIState,
    action: RegistrationActions
) => RegistrationUIState;
