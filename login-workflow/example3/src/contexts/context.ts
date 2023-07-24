import { createContext } from 'react';
import { AppContextProviderProps } from './types';

export const AppContext = createContext<AppContextProviderProps | null>(null);
