/**
 * @packageDocumentation
 * @module AccountUIContext
 */

import { AccountUIState } from './state';
import { AuthUIActions } from '../AuthUIContextProvider';
import { AccountActions } from './dispatchActions';

export type AccountUIActions = AuthUIActions;

export type AccountUIContextActions = {
    actions: AccountUIActions;
    dispatch: React.Dispatch<AccountActions>;
};

export type AccountUIActionsCreator = (dispatch: React.Dispatch<AccountActions>) => AccountUIActions;
export type AccountUIReducer = (prevState: AccountUIState, action: AccountActions) => AccountUIState;
