/**
 * @packageDocumentation
 * @module OktaAuthContext
 */

import { i18n } from 'i18next';
import { RouteConfig } from '../../types';
import { ErrorContextProviderProps } from '../ErrorContext/types';

export type OktaAuthContextProviderProps = {
    /**
     * Configures the language displayed on the screens
     */
    language: string;

    /**
     * A function that is used to navigate to a new URL. This is used to navigate to the various screens of the workflow
     */
    navigate: (destination: -1 | string) => void;

    /**
     * Object describing the URLs you are using for the relevant routes so the workflow can correctly navigate between screens
     */
    routeConfig: RouteConfig;

    /**
     * An optional i18n object that is used to translate the UI. This is only needed if you want to use custom translation keys / languages inside any of the workflow screens
     */
    i18n?: i18n;

    /**
     *  An error config for error context provider
     */
    errorConfig?: ErrorContextProviderProps;
};
