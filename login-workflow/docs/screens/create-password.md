# CreatePasswordScreen

## Description
A screen that displays text fields to set the user's password. The CreatePasswordScreen must be used in the context of the `RegistrationContextProvider`.

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
        <CreatePassword
          PasswordProps={{
            passwordLabel: 'Password',
            confirmPasswordLabel: 'Confirm Password',
          }}
        />
    </RegistrationContextProvider>
  );
};
```

## API

- **WorkflowCardProps** 
  - See [Workflow Card](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/workflow-card.md) for more details.
- **PasswordProps** 
  - See [Set Password](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/set-password.md)
- **errorDisplayConfig**
  - See [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md)