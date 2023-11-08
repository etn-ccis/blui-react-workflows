# SuccessScreenBase

A component to use as a simple success screen for mini 1-step workflows (like Forgot Paswsword). It renders a a message, an icon, and a dismiss button.

![Success](../../media/screens/success.png)

## Usage

```tsx
import { SuccessScreenBase } from '@brightlayer-ui/react-auth-workflow';

...

<SuccessScreenBase />
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| icon | `React.ReactNode` | The icon to be displayed on the screen. |  |
| message | `ReactNode` | The message to be displayed on the screen. |  |
| dismissButtonLabel | `string` | The label of the dismiss button. |  |
| canDismiss | `boolean` | A boolean determining if the screen can be dismissed. |  |
| onDismiss | `() => void` | A function to be called when the screen is dismissed. |  |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.
  