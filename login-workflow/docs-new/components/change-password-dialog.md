# ChangePasswordDialog

## Description
Component that renders a dialog to change the user's password. This component provides a form to enter the user's current password and a new password. The dialog will display an error if the new password does not meet the password requirements.

## Usage
```tsx
import { ChangePasswordDialog } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <ChangePasswordDialog />
  );
};
```

## API

- **DialogProps** 
  - See [Dialog](https://mui.com/material-ui/react-dialog/) for more details.
- **PasswordProps** 
  - See [Set Password](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/set-password.md).
- **ErrorDialogProps** 
  - Props to pass to the error dialog.
  - **Type:** `BasicDialogProps`
  - See [Basic Dialog](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/basic-dialog.md).
- **dialogTitle** (optional)
  - The title to display in the dialog.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:CHANGE_PASSWORD_DIALOG.TITLE')`
- **dialogDescription** (optional)
  - The description to display in the dialog.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:CHANGE_PASSWORD_DIALOG.DESCRIPTION')`
- **currentPasswordLabel** (optional)
  - The label to display for the current password field.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:CHANGE_PASSWORD_DIALOG.CURRENT_PASSWORD_LABEL')`
- **previousLabel** (optional)
  - The label to display for the previous button.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:CHANGE_PASSWORD_DIALOG.PREVIOUS')`
- **nextLabel** (optional)
  - The label to display for the next button.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:CHANGE_PASSWORD_DIALOG.NEXT')`
- **currentPasswordChange** (optional)
  - Called when the current password field changes.
  - **Type:** `(currentPassword: string) => void`
- **enableButton** (optional)
  - True if the next button should be enabled.
  - **Type:** `boolean | (() => boolean)`
  - **Default:** `false`
- **onSubmit** (optional)
  - Called when the next button is clicked.
  - **Type:** `() => void`
- **onPrevious** (optional)
  - Called when the previous button is clicked.
  - **Type:** `() => void`
- **sx** (optional)
  - Props to pass to the dialog.
  - **Type:** `SxProps`
- **loading** (optional)
  - Whether or not the dialog is loading. 
  - **Type:** `boolean`