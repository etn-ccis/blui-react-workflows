/**
 * @packageDocumentation
 * @module SecurityContextProvider
 */

/**
 * Basic state upon which to make application security decisions.
 */
export type SecurityContextState = {
    /**
     * Email of the authenticated user.
     */
    email?: string;
    /**
     * UserId of the authenticated user (may be an email).
     */
    userId?: string;
    /**
     * Information for a user who wants to be remembered upon logout.
     */
    rememberMeDetails: {
        /**
         * Email address to show in the email field of Login after logout.
         */
        email?: string;
        /**
         * When true, the user's email will be in the email field of Login.
         */
        rememberMe?: boolean;
    };
    /**
     * True: The security state is being loaded (all other fields are invalid).
     * False: The security state has been loaded.
     */
    isLoading: boolean;
    /**
     * Used for animation purposes only.
     * True: The user is logged in currently and a change will be the result of
     * logging out.
     * False: The user is likely logging in if authentication state changes.
     */
    isSignOut: boolean;
    /**
     * True: The user is authenticated and the application is shown (or the Change Password interface).
     * False: The user is not authenticated and the Authentication User Interface is shown.
     */
    isAuthenticatedUser: boolean;
    /**
     * True: The Change Password screen is currently visible.
     * False: The Change Password screen is not currently visible.
     */
    isShowingChangePassword: boolean;
};

/**
 * Change the security state of the applications.
 */
export type SecurityContextActions = {
    /**
     * If the user has been authenticated, this function should be called.
     * Most likely, this should be called within the [[initiateSecurity]] or [[logIn]] actions
     * of the [[AuthUIActions]] provided to the [[AuthUIContextProvider]].
     * Once called, the application will be shown.
     *
     * @param args.email Email with which the user authenticated.
     * @param args.userId UserId of the authenticated user (may be email).
     * @param args.rememberMe Whether the user's email should be visible upon logout.
     */
    onUserAuthenticated(args: { email: string; userId: string; rememberMe: boolean }): void;
    /**
     * If the user has been deauthenticated (either because they logged out or app started with no
     * credentials), this function should be called.
     * Most likely, this should be called within the [[initiateSecurity]] action of the
     * [[AuthUIActions]] provided to the [[AuthUIContextProvider]], or from a logout event
     * within the application.
     * Once called, the Authentication User Interface will be shown.
     *
     * @param clearRememberMe If true, clear any "remember me" data upon logout.
     * @param overrideRememberMeEmail If a value is provided, the [[SecurityContextState]]'s rememberMe
     * will be set to `true` and this email will be shown in the email field of Login upon logout.
     */
    onUserNotAuthenticated(clearRememberMe?: boolean, overrideRememberMeEmail?: string): void;
    /**
     * Present the Change Password screen to the user (if the user is authenticated).
     * The application will be unmounted.
     */
    showChangePassword(): void;
    /**
     * Close the Change Password screen.
     * This is most often called from within the Change Password screen.
     * If the user has successfully changed their password, then hiding Change Password will take to the
     * Authentication User Interface. If the user cancels changing their password, hiding Change Password
     * will take the user back to the application's main screen.
     */
    hideChangePassword(): void;
};
