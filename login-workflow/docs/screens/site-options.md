# SiteOptionsScreen

A component to use for DERMS Auth workflow. It renders a a message, an icon, and a two buttons with `Create a New Organization` and `Join Existing Organization` buttons.

<!-- This needs to be updatd in Full screen story -->
<!-- ![SiteOption](../../media/screens/success.png)

## Usage

```tsx
import { SiteOptionsScreenBase } from '@brightlayer-ui/react-auth-workflow';

...

<SiteOptionsScreen  /> -->
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| icon | `React.ReactNode` | The icon to be displayed on the screen. |  |
| messageTitle | `string` | The title of the success message. |  |
| message | `ReactNode` | The success message to be displayed on the screen. |  |
| previousButtonLabel | `string` | The label of the previous button. |  |
| nextButtonLabel | `string` | The label of the previous button. |  |
| onCreateNewOrganization | `() => void` | A function to be called when the previous button is clicked. |  |
| onJoinExistingOrganization | `() => void` | A function to be called when the next button is clicked. |  |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.
  