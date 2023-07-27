# VerifyCodeScreen

## Description
A screen that displays an input for a user to provide a verification code. The VerifyCodeScreen must be used in the context of the `RegistrationContextProvider`.

## Usage
```tsx
import { VerifyCodeScreen } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <RegistrationContextProvider
        language={language}
        routeConfig={routes}
        navigate={navigate}
        actions={ProjectRegistrationUIActions}
    >
        <VerifyCodeScreen
          verifyCodeInputLabel="Verification Code"
        />
    </RegistrationContextProvider>
  );
};
```
## API

- **WorkflowCardProps** 
  - See [Workflow Card](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/workflow-card.md) for more details.
- **codeValidator** (optional)
  - A function that validates the code text field.
  - **Type:** `(code: string) => boolean | string`
  - **Default:** 
  ```tsx
  (code: string): boolean | string => {
      if (code?.length > 0) {
        return true;
      }
      return 'Code must be at least 1 characters';
    }
  ```
- **onResend** (optional)
  - A function that is called when the resend link/button is clicked.
  - **Type:** `() => void`
- **resendInstructions** (optional)
  - Text to display ahead of the resend link/button.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:VERIFY_CODE.RESEND_INSTRUCTIONS')`
- **resendLabel** (optional)
  - Text to display for the resend link/button.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:VERIFY_CODE.RESEND')`
- **initialValue** (optional)
  - The initial value for the code text field.
  - **Type:** `string`
- **verifyCodeInputLabel** (optional)
  - The label for the code text field.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:VERIFY_CODE.VERIFICATION_CODE')`
- **errorDisplayConfig**
  - See [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md)