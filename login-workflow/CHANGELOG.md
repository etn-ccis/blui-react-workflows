# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v5.1.0 (December 20, 2024)

### Changed

-   Updated styles to use the new MUI 6.

### Fixed

-   Update the doc for Okta login authentication ([#658](https://github.com/etn-ccis/blui-react-workflows/issues/658))
-   Update unstable_composeClasses imports ([#677](https://github.com/etn-ccis/blui-react-workflows/issues/677))
-   WorkflowCard components warnings ([#684](https://github.com/etn-ccis/blui-react-workflows/issues/684))

## v5.0.1 (November 26, 2024)

### Fixed

-   Issue with ChangePasswordDialog `errorDisplayConfig` ([#656](https://github.com/etn-ccis/blui-react-workflows/issues/656)).
-   Issue with `errorDisplayConfig` in screens unable to display the custom error ([#664](https://github.com/etn-ccis/blui-react-workflows/issues/664)).

## v5.0.0 (September 11, 2024)

### Added

-   Okta redirect-compatible login screen.
-   Error Manager for ChangePasswordDialog ([#612](https://github.com/etn-ccis/blui-react-workflows/issues/612)).
-   BLUI class names for ChangePasswordDialog ([#600](https://github.com/etn-ccis/blui-react-workflows/issues/600)).
-   SX style overrides on full screens ([#599](https://github.com/etn-ccis/blui-react-workflows/issues/599)).

### Fixed

-   Reload EULA should not be tied to checkbox status ([#549](https://github.com/etn-ccis/blui-react-workflows/issues/549)).
-   Updated password validation callback function ([#560](https://github.com/etn-ccis/blui-react-workflows/issues/560)).

### Changed

-   Eliminate `WorkflowCardFinishState` and introduce `EmptyStateProps` in the success screen([#552](https://github.com/etn-ccis/blui-react-workflows/issues/552)).

## v4.0.3 (May 9, 2024)

### Fixed

-   Error Manager with dynamic values ([#540](https://github.com/etn-ccis/blui-react-workflows/issues/540)).
-   Eula screen tests throws console warnings to wrap ([#390](https://github.com/etn-ccis/blui-react-workflows/issues/390)).
-   Hardcoded dismissible Dialog button text ([#543](https://github.com/etn-ccis/blui-react-workflows/issues/543)).
-   Fix dependency on react-router ([#546](https://github.com/etn-ccis/blui-react-workflows/issues/546)).
-   Typo in Success screen readme ([#567](https://github.com/etn-ccis/blui-react-workflows/issues/547)).

## v4.0.2 (December 18, 2023)

### Added

-   `sx` prop to Error Manager Dialog ([#521](https://github.com/etn-ccis/blui-react-workflows/issues/521)).

### Fixed

-   Issue where the `email` field did not pass to `validateUserRegistrationRequest` RegistrationUIActions when email is available ([#529](https://github.com/etn-ccis/blui-react-workflows/issues/529)).

## v4.0.1 (December 4, 2023)

### Fixed

-   Translations not working while throwing error from actions ([#513](https://github.com/etn-ccis/blui-react-workflows/issues/513)).
-   Error in the dialog / message box does not translate ([#510](https://github.com/etn-ccis/blui-react-workflows/issues/510)).
-   Title missing in the messageBoxConfig of ErrorManager ([#507](https://github.com/etn-ccis/blui-react-workflows/issues/507)).
-   Added loader to the login action ([#511](https://github.com/etn-ccis/blui-react-workflows/issues/511)).

## v4.0.0 (October 4, 2023)

### Added

-   Reusable screen components.
-   Support for custom react auth workflow injection.
-   Support for router customizability.

Learn more about migrating from v3 => v4 your existing application by reading our [Migrating Guide](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/README.md#migrating-from-v3--v4).

### Changed

-   Updated i18next and react-i18next packages to the latest.

## v3.1.1 (December 14, 2022)

### Changed

-   Removed dependency on @mui/styles ([#170](https://github.com/etn-ccis/blui-react-workflows/issues/170)).

### Fixed

-   Issue where password field displays two show password icons on Edge and IE ([#173](https://github.com/etn-ccis/blui-react-workflows/issues/173)).

## v3.1.0 (June 24, 2022)

### Changed

-   Updated styles to use the new MUI styled engine.

## v3.0.1 (April 14, 2022)

### Added

-   Support for React 18.

## v3.0.0 (April 1, 2022)

### Changed

-   We now use [Material UI v5](https://mui.com/) — you will need to update peerDependencies appropriately and make the [necessary changes](https://mui.com/guides/migration-v4/) to migrate your application to the new version.
-   We now use [React Router v6](https://reactrouter.com/docs/en/v6/upgrading/v5) — this will likely require you to reconfigure how your application routes are set up. Routes must be passed directly into the `<AuthNavigationContainer>` element.

## v2.5.0 (March 14, 2022)

### Added

-   Support for Portuguese translations.

### Changed

-   Import material-ui components via default imports instead of named imports to reduce overall bundle size ([#85](https://github.com/etn-ccis/blui-react-workflows/issues/85))

### Fixed

-   Issue where the org name not appearing on the registration success screens.

## v2.4.0 (December 6, 2021)

### Changed

-   Changed package namespace from `@pxblue` to `@brightlayer-ui`.

## Package Migration Notice

Previous versions listed after this indicator refer to our deprecated `@pxblue` packages.

---

## v2.4.0 (August 27, 2021)

### Added

-   Ability to customize how error messages are displayed on the login screen via the `loginErrorDisplayConfig` prop on the `AuthUIContextProvider`.

## v2.3.1 (August 12, 2021)

### Fixed

-   Issue with error messages not being displayed while changing password ([#77](https://github.com/pxblue/react-workflows/issues/77)).

## v2.3.0 (July 27, 2021)

### Fixed

-   Issue with login function being called twice ([#70](https://github.com/pxblue/react-workflows/issues/70)).
-   Issue where "Invalid Credentials" error message would persist on login screen([#67](https://github.com/pxblue/react-workflows/issues/67)).

### Changed

-   EULA screen now appears first in the self registration workflow.
-   Allow users to go back at all steps of the registration flow.

### Added

-   Ability to customize the character limits for first and last name text fields in the registration workflow via the `registrationConfig` prop on the `AuthUIContextProvider` ([#72](https://github.com/pxblue/react-workflows/issues/72)).

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
