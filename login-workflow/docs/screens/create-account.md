# CreateAccountScreen

## Description
A screen that displays a text field to collect the user's email address. The CreateAccountScreen must be used in the context of the `RegistrationContextProvider`.

## Usage
```tsx
import { CreateAccountScreen } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <RegistrationContextProvider
        language={language}
        routeConfig={routes}
        navigate={navigate}
        actions={ProjectRegistrationUIActions}
    >
        <CreateAccountScreen
          emailLabel="Email Address"
        />
    </RegistrationContextProvider>
  );
};
```

## API

- **WorkflowCardProps** 
  - See [Workflow Card](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/workflow-card.md) for more details.
- **emailLabel** (optional)
  - Text to display as the label for the email text field.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:CREATE_ACCOUNT.EMAIL_ADDRESS')`
- **initialValue** (optional)
  - The initial value for the email text field.
  - **Type:** `string`
- **emailValidator** (optional)
  - A function that validates the email text field.
  - **Type:** `(email: string) => boolean | string`
  - **Default:** 
  ```tsx
  (email: string): boolean | string => {
      if (email?.length > 0) {
        return true;
      }
      return 'Email must be at least 1 characters';
    }
  ```
- **emailTextFieldProps** (optional)
  - **Type:** `TextFieldProps`
  - - See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
- **ErrorDisplayConfig** 
  - See [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md)