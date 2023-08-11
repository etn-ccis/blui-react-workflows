/**
 * @packageDocumentation
 * @module ErrorContext
 */

import { ErrorManagerProps } from '../../components/Error/ErrorManager';

export type ErrorContextProviderProps = Omit<ErrorManagerProps, 'error'>;
