# SuccessScreenBase

## Description
A component that renders a success screen with a message, an icon, and a dismiss button.

## Usage
```tsx
import { SuccessScreenBase } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <SuccessScreenBase />
  );
};
```

## API

 - **WorkflowCardProps** 
   - See [Workflow Card](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/workflow-card.md) for more details.
 - **icon** (optional)
   - The icon to be displayed on the screen.
   - **Type:** `React.ReactNode`
 - **messageTitle** (optional)
   - The title of the success message.
   - **Type:** `string`
   - **Default:** `''`
 - **message** (optional)
   - The success message to be displayed on the screen.
   - **Type:** `string`
   - **Default:** `''`
 - **dismissButtonLabel** (optional)
   - The label of the dismiss button.
   - **Type:** `string`
   - **Default:** `''`
 - **canDismiss** (optional)
   - A boolean determining if the screen can be dismissed.
   - **Type:** `boolean`
 - **onDismiss** (optional)
   - A function to be called when the screen is dismissed.
   - **Type:** `() => void`
  