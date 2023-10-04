# ChangePasswordDialog

This component provides a form to enter the user's current password and a new password. The dialog will display an error if the new password does not meet the password requirements. This component must be used within an `AuthContextProvider`.

![Change Password Dialog](../../media/screens/change-password.png)

## Usage

```tsx
import { AuthContextProvider, ChangePasswordDialog } from '@brightlayer-ui/react-auth-workflow';

...
<AuthContextProvider {...props}>
  <ChangePasswordDialog open/>
</AuthContextProvider>
```

## API

| Prop Name                     | Type                                | Description                                                                                                                     | Default                                                       |
| ----------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| PasswordProps                 | `SetPasswordProps`                  | See [Set Password](./set-password.md)                                                                                           |                                                               |
| ErrorDialogProps              | `BasicDialogProps`                  | Props to configure a nested error dialog if there are errors changing the password. See [Basic Dialog](./basic-dialog.md).      |                                                               |
| dialogTitle                   | `string`                            | The title to display in the dialog.                                                                                             | `t('bluiAuth:CHANGE_PASSWORD_DIALOG.TITLE')`                  |
| dialogDescription             | `string`                            | The description to display in the dialog.                                                                                       | `t('bluiAuth:CHANGE_PASSWORD_DIALOG.DESCRIPTION')`            |
| currentPasswordLabel          | `string`                            | The label to display for the current password field.                                                                            | `t('bluiAuth:CHANGE_PASSWORD_DIALOG.CURRENT_PASSWORD_LABEL')` |
| previousLabel                 | `string`                            | The label to display for the previous/cancel button.                                                                            | `t('bluiCommon:ACTIONS.BACK')`                                |
| nextLabel                     | `string`                            | The label to display for the next button.                                                                                       | `t('bluiCommon:ACTIONS.OKAY')`                                |
| currentPasswordChange         | `(currentPassword: string) => void` | Callback called when the current password field input changes.                                                                  |                                                               |
| enableButton                  | `boolean \| (() => boolean)`        | True if the next button should be enabled.                                                                                      | `false`                                                       |
| onFinish                      | `() => void`                        | Called when the button is clicked on success screen.                                                                            |                                                               |
| onSubmit                      | `() => void \| Promise<void>`       | Called when the next button is clicked.                                                                                         |                                                               |
| onPrevious                    | `() => void`                        | Callback called when the previous/back/cancel button is clicked.                                                                |                                                               |
| loading                       | `boolean`                           | Whether or not the dialog is loading.                                                                                           |                                                               |
| currentPasswordTextFieldProps | `TextFieldProps`                    | Props to pass to the current password input field. See MUI's [TextFieldProps API](https://mui.com/material-ui/api/text-field/). |                                                               |
| showSuccessScreen             | `boolean`                           | Used to determine whether to show a success screen after the form is submitted.                                                 |                                                               |
| slots                         | `ChangePasswordDialogSlots`         | Components to use in place of the defaults. See [ChangePasswordDialogSlots](#changepassworddialogslots)                         |                                                               |
| slotProps                     | `ChangePasswordDialogSlotsProps`    | Props to pass to the custom slot components. See [ChangePasswordDialogSlotsProps](#changepassworddialogslotsprops)              |                                                               |

### ChangePasswordDialogSlots

| Key           | Type                                         | Description                                                                    |
| ------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| SuccessScreen | `(props: SuccessScreenProps) => JSX.Element` | A custom success screen component to render. See [SuccessScreen](../screens/success.md) |

### ChangePasswordDialogSlotsProps

| Key           | Type                 | Description                                                                             |
| ------------- | -------------------- | --------------------------------------------------------------------------------------- |
| SuccessScreen | `SuccessScreenProps` | Props to pass to the custom success screen component. See [SuccessScreen](../screens/success.md) |

Props from the underlying MUI [Dialog](https://mui.com/material-ui/react-dialog/) are also available.
