import { RegistrationContext, useRegistrationContext } from './context';
import { i18nRegistrationInstance } from './i18nRegistrationInstance';
import { RegistrationContextProviderProps, RegistrationUIActions } from './types';
import { RegistrationContextProvider } from './provider';

export type { RegistrationContextProviderProps, RegistrationUIActions };
export { RegistrationContext, RegistrationContextProvider, i18nRegistrationInstance, useRegistrationContext };
