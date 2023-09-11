# LoginScreen

Component that renders a login screen that prompts a user to enter a username and password to login. The LoginScreen must be used within an `AuthContextProvider` .

![Login](../../media/screens/login.png)

## Usage

```tsx
import { AuthContextProvider, LoginScreen } from '@brightlayer-ui/react-auth-workflow';

...

<AuthContextProvider {...props}>
  <LoginScreen />
</AuthContextProvider>
```

## API

### Login Configuration

| Prop Name | Type | Description | Default |
|---|---|---|---|
| usernameLabel | `string` | Label for the username field. | `t('bluiCommon:LABELS.EMAIL')` |
| usernameTextFieldProps | `TextFieldProps` | Props to pass to the MUI [TextField](https://mui.com/material-ui/api/text-field/) component. |  |
| usernameValidator | `(username: string) => boolean \| string` | A function that validates the username text field input. | checks against valid email regex |
| initialUsernameValue | `string` | Username used to pre-populate the field. |  |
| passwordLabel | `string` | Label for the password field. | `t('bluiCommon:LABELS.EMAIL')` |
| passwordTextFieldProps | `TextFieldProps` | Props to pass to the MUI [TextField](https://mui.com/material-ui/api/text-field/) component. |  |
| passwordValidator | `(password: string) => boolean \| string` | A function that validates the password text field input. | checks against valid email regex |
| passwordRequiredValidatorText | `string` | Text for showing password is required. |  `t('bluiCommon:MESSAGES.PASSWORD_REQUIRED_ERROR')` |
| initialUsernameValue | `string` | Username used to pre-populate the field. |  |
| loginButtonLabel | `string` | Label for the login button. | `t('bluiCommon:ACTIONS.LOG_IN')` |
| onLogin | `(username: string, password: string, rememberMe: boolean) => Promise<void>` | Callback function that is called when the login button is clicked. |  |

### Remember Me Configuration

| Prop Name | Type | Description | Default |
|---|---|---|---|
| showRememberMe | `boolean` | Whether or not to show the 'remember me' checkbox. | `true` |
| rememberMeLabel | `string` | Label for the 'remember me' checkbox. | `t('bluiCommon:ACTIONS.REMEMBER')` |
| rememberMeInitialValue | `boolean` | Whether or not the 'remember me' checkbox should be checked by default. | `false` |
| onRememberMeChanged | `(value: boolean) => void` | Callback function that is called when the 'remember me' checkbox is changed. |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

### Forgot Password Configuration

| Prop Name | Type | Description | Default |
|---|---|---|---|
| showForgotPassword | `boolean` | Whether or not to show the 'forgot password' link. | `true` |
| forgotPasswordLabel | `string` | Label for the 'forgot password' link. | `t('bluiCommon:LABELS.FORGOT_PASSWORD')` |
| onForgotPassword | `() => void` | Callback function that is called when the 'forgot password' link is clicked. |  |
|  |  |  |  |

### Self Registration Configuration

| Prop Name | Type | Description | Default |
|---|---|---|---|
| showSelfRegistration | `boolean` | Whether or not to show the 'self registration' link. | `true` |
| selfRegisterButtonLabel | `string` | Label for the 'self registration' link. | `t('bluiCommon:ACTIONS.CREATE_ACCOUNT')` |
| selfRegisterInstructions | `string` | Instructions to display before the 'self registration' link. | `t('bluiCommon:LABELS.NEED_ACCOUNT')` |
| onSelfRegister | `() => void` | Callback function that is called when the 'self registration' link is clicked. |  |

### Contact Support Configuration

| Prop Name | Type | Description | Default |
|---|---|---|---|
| showContactSupport | `boolean` | Whether or not to show the 'contact support' link. | `true` |
| contactSupportLabel | `string` | Label for the 'contact support' link. | `t('bluiCommon:MESSAGES.CONTACT')` |
| onContactSupport | `() => void` | Callback function that is called when the 'contact support' link is clicked. |  |

### Additional Visuals Configuration

| Prop Name | Type | Description | Default |
|---|---|---|---|
| showCyberSecurityBadge | `boolean` | Whether or not to show the cyber security badge. | `true` |
| projectImage | `ReactNode` | Image to display at the top of the screen. |  |
| header | `ReactNode` | Custom content to display at the top of the screen. |  |
| footer | `ReactNode` | Custom content to display at the bottom of the screen. |  |
| errorDisplayConfig | `ErrorManagerProps` | See [Error Management](../error-management.md) |  |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.
