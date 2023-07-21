import { RegistrationContext, useRegistrationContext } from './context';
import { i18nRegistrationInstance } from './i18nRegistrationInstance';
import { RegistrationContextProviderProps, RegistrationUIActions, AccountDetails } from './types';
import { RegistrationContextProvider } from './provider';
import { RegistrationDictionaries } from './RegistrationDictionaries';
export type { RegistrationContextProviderProps, RegistrationUIActions, AccountDetails };
export {
    RegistrationContext,
    RegistrationContextProvider,
    i18nRegistrationInstance,
    useRegistrationContext,
    RegistrationDictionaries,
};
