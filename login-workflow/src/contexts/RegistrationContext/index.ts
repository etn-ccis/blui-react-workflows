import { RegistrationContext, useRegistrationContext } from './context';
import i18next from './i18nRegistrationInstance';
import { RegistrationContextProviderProps, RegistrationUIActions, AccountDetails } from './types';
import { RegistrationContextProvider } from './provider';
import { RegistrationDictionaries } from './RegistrationDictionaries';
export type { RegistrationContextProviderProps, RegistrationUIActions, AccountDetails };
export { RegistrationContext, RegistrationContextProvider, i18next, useRegistrationContext, RegistrationDictionaries };
