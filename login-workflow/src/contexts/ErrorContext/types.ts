/**
 * @packageDocumentation
 * @module ErrorContext
 */

import { ErrorManagerProps } from '../../components/Error/types';

export type ErrorContextProviderProps = Omit<ErrorManagerProps, 'error'>;
