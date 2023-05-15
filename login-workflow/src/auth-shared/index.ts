/**
 Copyright (c) 2021-present, Eaton

 All rights reserved.

 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
/**
 * General docs
 *
 * @packageDocumentation
 * @module  @etn-sst/react-native-auth-ui
 * @preferred
 */

import { english, french, spanish, chinese, portuguese } from './data/translations';

export * from './constants';

export * from './contexts/AccountUIContext';
export * from './contexts/SecurityContextProvider';
export { AuthUIContextProvider } from './contexts/AuthUIContextProvider';
export type {
    AuthUIContextProviderProps,
    RegistrationUIActions,
    // TODO: AuthUIActions is exported from the new-architecture, which is conflicting with this
    // AuthUIActions,
    CustomRegistrationForm,
    LoginErrorDisplayConfig,
} from './contexts/AuthUIContextProvider';
export { useInjectedUIContext } from './contexts/AuthUIContextProvider';
export type { SecurityContextActions } from './contexts/SecurityContextProvider';
export * from './contexts/RegistrationUIContext';

export * from './contexts/TransitState';
export * from './hooks';
export * from './lib';

export { AuthUIInternalStore } from './stores/AuthUIInternalStore';
export * from './types';

export const translations = {
    english: english,
    french: french,
    spanish: spanish,
    chinese: chinese,
    portuguese: portuguese,
};

export * from './helpers/parseTextForJSX';
