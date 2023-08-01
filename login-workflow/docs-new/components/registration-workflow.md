# RegistrationWorkflow

## Description
A component that renders a registration workflow which guides a user through the process of registering a new account. The RegistrationWorkflow must be used in the context of the `RegistrationContextProvider`.

## Usage
```tsx
import { RegistrationWorkflow } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <RegistrationWorkflow>
      // your registration screens here
    </RegistrationWorkflow>
  );
};
```

## API

 - **initialScreenIndex** (optional)
   - The initial screen index to start the registration workflow from.
   - **Type:** `number`
   - **Default:** `0`
 - **successScreen** (optional)
   - The success screen to display upon successful registration.
   - **Type:** `JSX.Element`
   - **Default:** `<RegistrationSuccessScreen />`
 - **children**
   - The children to render within the registration workflow. These should be the individual registration screens.
   - **Type:** `React.ReactNode[]`
