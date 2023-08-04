# ResetPasswordScreen

## Description
A screen that allows a user to reset their password. The ResetPasswordScreen must be used in the context of the `AuthContextProvider`.

## Usage
```tsx
import { ResetPasswordScreen } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <AuthContextProvider
        language={language}
        routeConfig={routes}
        navigate={navigate}
        actions={ProjectAuthUIActions}
    >
        <ResetPasswordScreen />
    </RegistrationContextProvider>
  );
};
```

## API

- **WorkflowCardProps** 
  - See [Workflow Card](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/workflow-card.md) for more details.
- **PasswordProps** 
  - See [Set Password](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/set-password.md)
- **showSuccessScreen** (optional)
  - Whether to show the success screen.
  - **Type:** `boolean`
  - **Default:** `true`
- **slots** (optional)
  - Slots to render in place of the default screens.
  - **Type:** `ResetPasswordScreenSlots`
  - see [ResetPasswordScreenSlots](#redsetpasswordscreenslots)
- **slotProps** (optional)
  - Props to pass to the slots.
  - **Type:** `ResetPasswordScreenSlotProps`
  - see [ResetPasswordScreenSlotProps](#resetpasswordscreenslotprops)
- **errorDisplayConfig** (optional)
  - See [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md)

### ResetPasswordScreenSlots
- SuccessScreen?: (props: SuccessScreenProps) => JSX.Element;
  - See [SuccessScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/success.md)
### ResetPasswordScreenSlotProps
- SuccessScreen?: SuccessScreenProps;
  - See [SuccessScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/success.md)