# EulaScreen

## Description
A screen that displays an End User License Agreement and a checkbox to confirm that they have read and agree to the agreement. The EulaScreen must be used in the context of the `RegistrationContextProvider`.

## Usage
```tsx
import { CreatePasswordScreen } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <RegistrationContextProvider
        language={language}
        routeConfig={routes}
        navigate={navigate}
        actions={ProjectRegistrationUIActions}
    >
        <EulaScreen
          
        />
    </RegistrationContextProvider>
  );
};
```
## API

- **WorkflowCardProps** 
  - See [Workflow Card](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/workflow-card.md) for more details.
- **eulaContent** (optional)
  - The content to render for the EULA. Can be a plain string or HTML.
  - **Type:** `string | JSX.Element`
  - **Default:** `t('bluiAuth:EULA.EULA_CONTENT')`
- **checkboxLabel** (optional)
  - The text to render for the EULA checkbox.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:EULA.ACCEPT_EULA')`
- **checkboxProps** (optional)
  - Props to pass to the EULA checkbox.
  - **Type:** `CheckboxProps`
- **htmlEula** (optional)
  - True if the EULA should be rendered as HTML.
  - **Type:** `boolean`
  - **Default:** `false`
- **initialCheckboxValue** (optional)
  - Used to pre-populate the checked/unchecked checkbox when the screen loads.
  - **Type:** `boolean`
  - **Default:** `false`
- **onEulaAcceptedChange** (optional)
  - Called when the checkbox clicked.
  - **Type:** `(accepted: boolean) => boolean`
- **errorDisplayConfig**
  - See [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md)