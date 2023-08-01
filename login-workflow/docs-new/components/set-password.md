# SetPassword

## Description
Component that renders a change password form with a new password and confirm password inputs. It includes callbacks so you can respond to changes in the inputs.

## Usage
```tsx
import { SetPassword } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <SetPassword />
  );
};
```

## API

- **onPasswordChange** 
  - Called when the new password or confirm new password fields value changes.
  - **Type:** `(passwords: { password: string; confirm: string }) => void`
- **confirm** 
  - The confirm password field value.
  - **Type:** `string`
- **newPasswordLabel** (optional)
  - The label for the new password field.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:SET_PASSWORD.NEW_PASSWORD_LABEL')`
- **initialNewPasswordValue** (optional)
  - The initial value for the new password field.
  - **Type:** `string`
  - **Default:** `''`
- **confirmPasswordLabel** (optional)
  - The label for the confirm password field.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:SET_PASSWORD.CONFIRM_PASSWORD_LABEL')`
- **initialConfirmPasswordValue** (optional)
  - The initial value for the confirm password field.
  - **Type:** `string`
  - **Default:** `''`
- **passwordRequirements** (optional)
  - Optional requirements to set password.
  - **Type:** `PasswordRequirement[] | []`
  - See [PasswordRequirements](#PasswordRequirements) for more details.
- **passwordRef** (optional)
  - Optional ref to forward to the password input.
  - **Type:** `MutableRefObject<any>`
- **confirmRef** (optional)
  - Optional ref to forward to the confirm password input.
  - **Type:** `MutableRefObject<any>`
- **passwordNotMatchError** (optional)
  - Optional text for showing message when passwords not match.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:SET_PASSWORD.PASSWORD_NOT_MATCH')`
- **onSubmit** (optional)
  - Optional callback function to call when the mini form is submitted.
  - **Type:** `() => void`


### PasswordRequirements

- **description** 
  - The description of the password requirement.
  - **Type:** `string`
- **regex** 
  - The regex to validate the password.
  - **Type:** `RegExp`