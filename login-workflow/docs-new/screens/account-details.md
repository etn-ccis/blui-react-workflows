# AccountDetailsScreen

## Description
A screen that displays text fields to collect the user's account details. The AccountDetailsScreen must be used in the context of the `RegistrationContextProvider`.

## Usage
```tsx
import { AccountDetailsScreen } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <RegistrationContextProvider
        language={language}
        routeConfig={routes}
        navigate={navigate}
        actions={ProjectRegistrationUIActions}
    >
        <AccountDetailsScreen
          firstNameLabel="First Name"
          lastNameLabel="Last Name"
        />
    </RegistrationContextProvider>
  );
};
```

## API

- **WorkflowCardProps** 
  - See [Workflow Card](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/workflow-card.md) for more details.
- **FirstNameLabel** 
  - The label for the first name text field.
  - **Type:** `string`
  - **Default:** `"First Name"`
- **InitialFirstName** 
  - The initial value for the first name text field.
  - **Type:** `string`
- **FirstNameValidator** 
  - A function that validates the first name text field.
  - **Type:** `(firstName: string) => boolean | string`
  - **Default:** ```(name: string): boolean | string => {
            if (name?.length > 0) {
                return true;
            }
            return 'First name must be at least 1 characters';
        }```
- **FirstNameTextFieldProps** 
  - Props to pass to the first name text field.
  - **Type:** `TextFieldProps`
  - See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
- **LastNameLabel** 
  - The label for the last name text field.
  - **Type:** `string`
  - **Default:** `"Last Name"`
- **InitialLastName** 
  - The initial value for the last name text field.
  - **Type:** `string`
- **LastNameValidator** 
  - A function that validates the last name text field.
  - **Type:** `(lastName: string) => boolean | string`
  - **Default:** ```(name: string): boolean | string => {
            if (name?.length > 0) {
                return true;
            }
            return 'Last name must be at least 1 characters';
        }```
- **LastNameTextFieldProps** 
  - Props to pass to the last name text field.
  - **Type:** `TextFieldProps`
  - - See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
- **ErrorDisplayConfig** 
  - See [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md)
- **Sx** 
  - See [MUI's sx prop](https://mui.com/system/getting-started/the-sx-prop/) for more details.