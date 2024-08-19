# Screens

Each of the screens in both the Login / Authentication  and Registration workflows is exported as a standalone component that can be customized or used in your own custom-defined flows.

> These screen components must live inside of an appropriate `AuthContextProvider` or `RegistrationContextProvider`. If you want to use the components outside of these providers, you can import the `___Base` version of the screens instead, which are pure components driven exclusively by their props.

The following screen components are available:

- [AccountDetailsScreen](./account-details.md)
- [ContactSupportScreen](./contact.md)
- [CreateAccountScreen](./create-account.md)
- [CreatePasswordScreen](./create-password.md)
- [EulaScreen](./eula.md)
- [ForgotPasswordScreen](./forgot-password.md)
- [LoginScreen](./login.md)
- [OktaLoginScreen](./okta-login.md)
- [ResetPasswordScreen](./reset-password.md)
- [SuccessScreen](./success.md)
- [VerifyCodeScreen](./verify-code.md)