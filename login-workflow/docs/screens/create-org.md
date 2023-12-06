# CreateNewOrgScreen

A screen that displays a text field to collect an organization name. The CreateNewOrgScreen must be used within a `RegistrationContextProvider`.

## Usage

```tsx
import { RegistrationContextProvider, CreateNewOrgScreen } from '@brightlayer-ui/react-auth-workflow';

...

<RegistrationContextProvider {...props}>
    <CreateNewOrgScreen />
</RegistrationContextProvider>
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| icon | `JSX.Element` | Icon to display | `<DomainIcon color={'primary'} sx={{ fontSize: 54 }} />`|
| message | `ReactNode` | The message to be displayed on the screen | |
| orgNameLabel | `string` | Text to display as the label for the organization name text field. | `t('bluiCommon:LABELS.ORG_NAME')` |
| initialValue | `string` | The initial value for the organization name text field. |  |
| orgNameValidator | `(orgName: string) => boolean \| string` | A function that validates the organization name text field input.  | Checks that orgName input has length greater than 0 |
| orgNameTextFieldProps | `TextFieldProps` | Props to pass to the MUI [TextField](https://mui.com/material-ui/api/text-field/) component. |  |
| errorDisplayConfig | `ErrorManagerProps` | See [Error Management](../error-management.md) |  |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.