/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */

import { RegistrationActions as DispatchActions } from './dispatchActions';
import { AccountDetailInformation, CustomAccountDetails } from '../../types/AccountDetails';
import { RegistrationUIActions } from '../AuthUIContextProvider';

type RegistrationUIActionsFunction = () => RegistrationUIActions;
type RegistrationUIActionsCreator = (
    injectedActions: RegistrationUIActions,
    dispatch: React.Dispatch<DispatchActions>
) => RegistrationUIActionsFunction;

/**
 * Implementation of actions for altering the global [[RegistrationUIState]] via [[RegistrationUIActions]] calls.
 * Uses actions injected into the app to make network calls, and then updates the global state accordingly
 * using by dispatching [[RegistrationActions]] to the [[registrationReducer]].
 *
 * @param injectedActions Implementation of network activities.
 * @param dispatch For updating reducer upon completion of network activities.
 */
export const RegistrationActionsCreator: RegistrationUIActionsCreator =
    (injectedActions, dispatch) => (): RegistrationUIActions => ({
        loadEULA: async (language: string): Promise<string> => {
            const transitId = Math.random();

            dispatch(DispatchActions.loadEulaStarted(transitId, language));
            try {
                const eulaText = await injectedActions.loadEULA(language);
                dispatch(DispatchActions.loadEulaSucceeded(transitId));
                return eulaText;
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(DispatchActions.loadEulaFailed(transitId, error.message));
                    throw error;
                } else throw error;
            }
        },
        requestRegistrationCode: async (email: string): Promise<void> => {
            const transitId = Math.random();
            dispatch(DispatchActions.requestRegistrationCodeStarted(transitId));
            try {
                await injectedActions.requestRegistrationCode(email);
                dispatch(DispatchActions.requestRegistrationCodeSucceeded(transitId));
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(DispatchActions.requestRegistrationCodeFailed(transitId, error.message));
                } else throw error;
            }
        },
        validateUserRegistrationRequest: async (validationCode: string, validationEmail?: string): Promise<boolean> => {
            const transitId = Math.random();

            dispatch(DispatchActions.validateUserRegistrationStarted(transitId));
            try {
                const registrationComplete = await injectedActions.validateUserRegistrationRequest(
                    validationCode,
                    validationEmail
                );
                dispatch(DispatchActions.validateUserRegistrationSucceeded(transitId));
                return registrationComplete;
            } catch (error) {
                if (error instanceof Error) {
                    // Need this for debug. No real security risk
                    if (validationCode === 'DEBUG_VALIDATION_CODE_DEADBEEF') {
                        dispatch(DispatchActions.validateUserRegistrationSucceeded(transitId));
                        return false;
                    }

                    dispatch(DispatchActions.validateUserRegistrationFailed(transitId, error.message));
                    throw error;
                } else throw error;
            }
        },
        completeRegistration: async (
            userData: {
                password: string;
                accountDetails: AccountDetailInformation & CustomAccountDetails;
            },
            validationCode: string,
            validationEmail?: string
        ): Promise<{ email: string; organizationName: string }> => {
            const transitId = Math.random();

            dispatch(DispatchActions.registerUserStarted(transitId));

            try {
                const userDetails = await injectedActions.completeRegistration(
                    userData,
                    validationCode,
                    validationEmail
                );
                dispatch(
                    DispatchActions.registerUserSucceeded(transitId, userDetails.email, userDetails.organizationName)
                );
                return userDetails;
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(DispatchActions.registerUserFailed(transitId, error.message));
                    throw error;
                } else throw error;
            }
        },
    });
