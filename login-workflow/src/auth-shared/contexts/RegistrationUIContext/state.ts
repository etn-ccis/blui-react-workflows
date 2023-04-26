/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */

import { TransitState, initialTransitState } from '../TransitState';

/**
 * Global state for registration-related activities and loading the EULA for newly registering users.
 *
 * @param eulaTransit Network state for fetching a remote EULA.
 * @param inviteRegistration Network and returned values state for registration of anew user via invitation.
 */
export type RegistrationUIState = {
    eulaTransit: TransitState;
    inviteRegistration: InviteRegistrationState;
};

/**
 * Network state and returned email and organization for a user who was invited to register within the app (deep link token from their email).
 *
 * @param codeRequestTransit Network state for initiating user registration (sending verification email).
 * @param registrationTransit Network state for completing registration of the invited user.
 * @param validationTransit Network state for validating the invited user's invite token (the deep link token from their email).
 * @param email The email belonging to the user who was invited to register through the app.
 * @param organizationName The organization of the user who was invited to register through the app.
 */
type InviteRegistrationState = {
    codeRequestTransit: TransitState;
    registrationTransit: TransitState;
    validationTransit: TransitState;
    email: string | null;
    organizationName: string | null;
};

/**
 * Default initial state for [[RegistrationUIState]] upon app start.
 */
export const initialRegistrationState: RegistrationUIState = {
    eulaTransit: initialTransitState,
    inviteRegistration: {
        codeRequestTransit: initialTransitState,
        registrationTransit: initialTransitState,
        validationTransit: initialTransitState,
        email: null,
        organizationName: null,
    },
};
