# ContactScreen

## Description
A screen that displays contact information including email and phone number. The ContactScreen must be used in the context of the `AuthContextProvider`.

## Usage
```tsx
import { ContactScreen } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <AuthContextProvider
        language={language}
        routeConfig={routes}
        navigate={navigate}
        actions={ProjectAuthUIActions}
    >
        <ContactScreen 
            title="Contact Us"
        />
    </RegistrationContextProvider>
  );
};
```

## API

- **WorkflowCardProps** 
  - See [Workflow Card](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/workflow-card.md) for more details.
- **title**  (optional)
  - The title for the screen.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:USER_MENU.CONTACT_US')`
- **icon** (optional)
  - The icon to display in the header.
  - **Type:** `JSX.Element`
  - **Default:** `<ChatBubbleOutline>`
- **emailSupportTitle** (optional)
  - The title for the email support section.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:CONTACT_SUPPORT.GENERAL_QUESTIONS')`
- **emailSupportContent** (optional)
  - The content for the email support section.
  - **Type:** `(email: string) => string | JSX.Element`
- **phoneSupportTitle** (optional)
  - The title for the phone support section.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:CONTACT_SUPPORT.EMERGENCY_SUPPORT')`
- **phoneSupportContent** (optional)
  - The content for the phone support section.
  - **Type:** `(phone: string) => string | JSX.Element`
- **contactEmail** (optional)
  - The email address to display in the email support section.
  - **type:** `string`
  - **Default:** `something@email.com`
- **contactPhone** (optional)
  - The phone number to display in the phone support section.
  - **type:** `string`
  - **Default:** `1-800-123-4567`
- **dismissButtonLabel** (optional)
  - Text to display on the dismiss button.
  - **type:** `string`
  - **Default:** `t('bluiCommon:ACTIONS.OKAY')`
- **onDismiss** (optional)
  - Function to call when the dismiss button is clicked.
  - *type:** `() => void`