# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v2.4.0 (August 27, 2021)

### Added

-   Ability to customize how error messages are displayed on the login screen via the `loginErrorDisplayConfig` prop on the `AuthUIContextProvider`.

## v2.3.1 (August 12, 2021)

### Fixed

-   Issue with error messages not being displayed while changing password ([#77](https://github.com/brightlayer-ui/react-workflows/issues/77)).

## v2.3.0 (July 27, 2021)

### Fixed

-   Issue with login function being called twice ([#70](https://github.com/brightlayer-ui/react-workflows/issues/70)).
-   Issue where "Invalid Credentials" error message would persist on login screen([#67](https://github.com/brightlayer-ui/react-workflows/issues/67)).

### Changed

-   EULA screen now appears first in the self registration workflow.
-   Allow users to go back at all steps of the registration flow.

### Added

-   Ability to customize the character limits for first and last name text fields in the registration workflow via the `registrationConfig` prop on the `AuthUIContextProvider` ([#72](https://github.com/brightlayer-ui/react-workflows/issues/72)).

## v2.2.0 (June 28, 2021)

### Changed

-   Updated styles to improve mobile responsiveness.
-   Updated styles to improve dark theme.

### Added

-   Ability to use a username or email input field via the `loginType` prop on the `AuthUIContextProvider`.
-   Support for Spanish language.
-   Support for Chinese language.
-   Login screen email input validation error message.

## v2.1.0 (April 30, 2021)

### Added

-   Ability to customize the success screen in the Registration flows.

## v2.0.0 (March 31, 2021)

### Added

-   Ability to customize the Login screen by toggling on/off various elements and adding custom content.
-   Ability to insert custom forms into the Account Details section of registration for collecting additional user information.
-   Ability to add additional pre-auth routes via the `extraRoutes` prop on the `AuthNavigationContainer`.

### Removed

-   Phone number from the default fields collected during registration.
    -   If you need to collect phone number, you must now do it through a custom Account Details form.

## v1.0.1 (December 10, 2020)

### Fixed

-   Used more efficient icon import syntax for reduced bundle sizes.

## v1.0.0 (August 28, 2020)

### Added

-   Initial implementation of login workflow.
