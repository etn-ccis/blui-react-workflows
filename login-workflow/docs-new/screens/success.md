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

 - **icon**
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
 - **WorkflowCardBaseProps** (optional)
   - Props to be passed to the WorkflowCard component.
   - **Type:** `WorkflowCardProps`
 - **WorkflowCardHeaderProps** (optional)
   - Props to be passed to the WorkflowCardHeader component.
   - **Type:** `WorkflowCardHeaderProps`
 - **WorkflowCardActionsProps** (optional)
   - Props to be passed to the WorkflowCardActions component.
   - **Type:** `WorkflowCardActionsProps`
  