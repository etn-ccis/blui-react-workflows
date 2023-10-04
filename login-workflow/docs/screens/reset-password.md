# ResetPasswordScreen

A screen that allows a user to reset their password. The ResetPasswordScreen must be used within an `AuthContextProvider`.

![Reset Password](../../media/screens/reset-password.png)

## Usage

```tsx
import { AuthContextProvider, ResetPasswordScreen } from '@brightlayer-ui/react-auth-workflow';
...

<AuthContextProvider {...props}>
    <ResetPasswordScreen />
</AuthContextProvider>
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| PasswordProps | `SetPasswordProps` | See [Set Password](../components/set-password.md) |  |
| showSuccessScreen | `boolean` | If true, a success screen will appear after submitting the form | `true` |
| slots | `ResetPasswordScreenSlots` | Components to use in place of the defaults. See [ResetPasswordScreenSlots](#resetpasswordscreenslots) |  |
| slotProps | `ResetPasswordScreenSlotProps` | Props to pass to the custom slot components. See [ResetPasswordScreenSlotProps](#resetpasswordscreenslotprops) |  |
| errorDisplayConfig | `ErrorManagerProps` | See [Error Management](../error-management.md) |  |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.

### ResetPasswordScreenSlots

| Key | Type | Description |
|---|---|---|
| SuccessScreen | `(props: SuccessScreenProps) => JSX.Element` | A custom success screen component to render. See [SuccessScreen](./success.md) |

### ResetPasswordScreenSlotProps

| Key | Type | Description |
|---|---|---|
| SuccessScreen | `SuccessScreenProps` | Props to pass to the custom success screen component. See [SuccessScreen](./success.md) |