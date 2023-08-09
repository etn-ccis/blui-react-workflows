# ForgotPasswordScreen

## Description
A screen that collects an email address so a user who forgets their password can request a reset code. The ForgotPasswordScreen must be used in the context of the `AuthContextProvider`.

## Usage
```tsx
import { ForgotPasswordScreen } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <AuthContextProvider
        language={language}
        routeConfig={routes}
        navigate={navigate}
        actions={ProjectAuthUIActions}
    >
        <ForgotPasswordScreen />
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
  - **Default:** `t('bluiAuth:FORGOT_PASSWORD.EMAIL_ADDRESS')`
- **initialEmailValue** (optional)
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
- **slots** (optional)
  - Slots to render in place of the default screens.
  - **Type:** `ForgotPasswordScreenSlots`
  - see [ForgotPasswordScreenSlots](#forgotpasswordscreenslots)
- **slotProps** (optional)
  - Props to pass to the slots.
  - **Type:** `ForgotPasswordScreenSlotProps`
  - see [ForgotPasswordScreenSlotProps](#forgotpasswordscreenslotprops)
- **contactPhone** (optional)
  - The phone number to display in the contact section.
  - **Type:** `string`
  - **Default:** `1-800-123-4567`
- **responseTime** (optional)
  - The response time to display in the contact section.
  - **Type:** `string`
  - **Default:** `24 hours`
- **description** (optional)
  - A function that returns the description to display in the contact section.
  - **Type:** `(responseTime: string) => React.ReactNode`
  - **Default:** 
  ```tsx
  (responseTime: string): React.ReactNode => {
      return (
        <p>
          {t('bluiAuth:FORGOT_PASSWORD.DESCRIPTION', {
            responseTime,
          })}
        </p>
      );
    }
  ```
- **title** (optional)
  - Text to display as the title for the screen.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:FORGOT_PASSWORD.TITLE')`
- **showBackButton** (optional)
  - Whether to show the back button.
  - **Type:** `boolean`
  - **Default:** `true`
- **backButtonLabel** (optional)
  - Text to display on the back button.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:FORGOT_PASSWORD.BACK')`
- **canGoBack** (optional)
  - Whether the back button is enabled.
  - **Type:** `boolean | (() => boolean)`
  - **Default:** `true`
- **showNextButton** (optional)
  - Whether to show the next button.
  - **Type:** `boolean`
  - **Default:** `true`
- **nextButtonLabel** (optional)
  - Text to display on the next button.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:FORGOT_PASSWORD.NEXT')`
- **canGoNext** (optional)
  - Whether the next button is enabled.
  - **Type:** `boolean | (() => boolean)`
  - **Default:** `true`
- **showSuccessScreen** (optional)
  - Whether to show the success screen.
  - **Type:** `boolean`
  - **Default:** `true`
- **errorDisplayConfig** (optional)
  - See [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md)

### ForgotPasswordScreenSlots
- SuccessScreen?: (props: SuccessScreenProps) => JSX.Element;
  - See [SuccessScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/success.md)
### ForgotPasswordScreenSlotProps
- SuccessScreen?: SuccessScreenProps;
  - See [SuccessScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/success.md)
