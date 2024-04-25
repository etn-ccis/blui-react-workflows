/**
 * @packageDocumentation
 * @module ErrorContext
 */

import { ErrorManagerProps } from '../../components/Error/types';

/**
 * An object that is used as error handling context within the workflow.
 */
export type ErrorContextProviderProps = Omit<ErrorManagerProps, 'error'>;
