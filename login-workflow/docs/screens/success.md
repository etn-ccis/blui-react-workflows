# SuccessScreenBase

A component to use as a simple success screen for a mini 1-step workflow like the Forgot Password. It renders a message, icon, and a dismiss button.

![Success](../../media/screens/success.png)

## Usage

```tsx
import { SuccessScreenBase } from '@brightlayer-ui/react-auth-workflow';

...

<SuccessScreenBase />
```

## API

| Prop Name          | Type              | Description                                                                         | Default |
| ------------------ | ----------------- | ----------------------------------------------------------------------------------- | ------- |
| dismissButtonLabel | `string`          | The label of the dismiss button.                                                    |         |
| canDismiss         | `boolean`         | A boolean determining if the screen can be dismissed.                               |         |
| EmptyStateProps    | `EmptyStateProps` | EmptyStateProps, which include properties such as icon, title, and description etc. |         |
| onDismiss          | `() => void`      | A function to be called when the screen is dismissed.                               |         |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.
