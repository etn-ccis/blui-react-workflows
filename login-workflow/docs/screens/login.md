# LoginScreen

## Description
Component that renders a login screen that prompts a user to enter a username and password to login. The LoginScreen must be used in the context of the `AuthContextProvider`.

## Usage
```tsx
import { LoginScreen } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <LoginScreen />
  );
};
```

## API

- **WorkflowCardBaseProps** 
  - See [Workflow Card](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/workflow-card.md) for more details.

#### Configure Fields
 - **usernameLabel** (optional)
   - Label for the username field.
   - **Type:** `string`
   - **Default:** `t('bluiCommon:LABELS.EMAIL')`
 - **usernameTextFieldProps** (optional)
   - Props to pass to the username text field.
   - **Type:** `TextFieldProps`
   - - See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
 - **usernameValidator** (optional)
   - Function used to validate the username.
   - **Type:** `(username: string) => string | boolean`
   - **Default:** `(username: string): string | boolean => {
            if (!EMAIL_REGEX.test(username)) {
                return t('bluiCommon:MESSAGES.EMAIL_ENTRY_ERROR');
            }
            return true;
        }`
   - **Default:** Regex email test `/^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i`
 - **initialUsernameValue** (optional)
   - Username used to pre-populate the field.
   - **Type:** `string`
   - **Default:** `''`
 - **passwordLabel** (optional)
   - Label for the password field.
   - **Type:** `string`
   - **Default:** `t('bluiCommon:LABELS.PASSWORD')`
 - **passwordTextFieldProps** (optional)
   - Props to pass to the password text field.
   - **Type:** `TextFieldProps`
   - - See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.

#### Configure RememberMe
 - **showRememberMe** (optional)
   - Whether or not to show the 'remember me' checkbox.
   - **Type:** `boolean`
   - **Default:** `true`
 - **rememberMeLabel** (optional)
   - Label for the 'remember me' checkbox.
   - **Type:** `string`
   - **Default:** `t('bluiCommon:ACTIONS.REMEMBER')`
 - **rememberMeInitialValue** (optional)
   - Whether or not the 'remember me' checkbox should be checked by default.
   - **Type:** `boolean`
   - **Default:** `false`
 - **onRememberMeChanged** (optional)
   - Callback function that is called when the 'remember me' checkbox is changed.
   - **Type:** `(value: boolean) => void`

#### Configure Login
 - **loginButtonLabel** (optional)
   - Label for the login button.
   - **Type:** `string`
   - **Default:** `t('bluiCommon:ACTIONS.LOG_IN')`
 - **onLogin** (optional)
   - Callback function that is called when the login button is clicked.
   - **Type:** `(username: string, password: string, rememberMe: boolean) => Promise<void>`

#### Configure Forgot Password
 - **showForgotPassword** (optional)
   - Whether or not to show the 'forgot password' link.
   - **Type:** `boolean`
   - **Default:** `true`
 - **forgotPasswordLabel** (optional)
   - Label for the 'forgot password' link.
   - **Type:** `string`
   - **Default:** `t('bluiCommon:LABELS.FORGOT_PASSWORD')`
 - **onForgotPassword** (optional)
   - Callback function that is called when the 'forgot password' link is clicked.
   - **Type:** `() => void`

#### Configure Self Registration
 - **showSelfRegistration** (optional)
   - Whether or not to show the 'self registration' link.
   - **Type:** `boolean`
   - **Default:** `true`
 - **selfRegisterButtonLabel** (optional)
   - Label for the 'self registration' link.
   - **Type:** `string`
   - **Default:** `t('bluiCommon:ACTIONS.CREATE_ACCOUNT')`
 - **selfRegisterInstructions** (optional)
   - Instructions for the 'self registration' link.
   - **Type:** `string`
   - **Default:** `t('bluiCommon:LABELS.NEED_ACCOUNT')`
 - **onSelfRegister** (optional)
   - Callback function that is called when the 'self registration' link is clicked.
   - **Type:** `() => void`

#### Configure Support
 - **showContactSupport** (optional)
   - Whether or not to show the 'contact support' link.
   - **Type:** `boolean`
   - **Default:** `true`
 - **contactSupportLabel** (optional)
   - Label for the 'contact support' link.
   - **Type:** `string`
   - **Default:** `t('bluiCommon:MESSAGES.CONTACT')`
 - **onContactSupport** (optional)
   - Callback function that is called when the 'contact support' link is clicked.
   - **Type:** `() => void`

#### Configure Visual Customizations
 - **errorDisplayConfig** (optional)
   - Configuration for how errors should be displayed.
   - **Type:** `ErrorManagerProps`
 - **showCyberSecurityBadge** (optional)
   - Whether or not to show the cyber security badge.
   - **Type:** `boolean`
   - **Default:** `true`
 - **projectImage** (optional)
   - Image to display at the top of the screen.
   - **Type:** `ImageProps`
 - **header** (optional)
   - Header to display at the top of the screen.
   - **Type:** `React.ReactNode`
 - **footer** (optional)
   - Footer to display at the bottom of the screen.
   - **Type:** `React.ReactNode`
