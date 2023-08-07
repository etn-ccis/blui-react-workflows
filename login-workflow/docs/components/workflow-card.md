# WorkflowCard

## Description
Component that renders a card with a background image and a loading spinner. This component can be used to wrap the custom screens for a consistent look and feel of the auth workflow.

## Usage
```tsx
import { WorkflowCard } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <WorkflowCard />
  );
};
```

## API

- **CardProps** 
    - See [Card](https://mui.com/components/cards/) for more details.
- **WorkflowCardBaseProps** 
    - See [WorkflowCardBase](#workflowcardbaseprops) for more details.
- **WorkflowCardHeaderProps** 
    - See [WorkflowCardHeader](#workflowcardheader) for more details.
- **WorkflowCardInstructionProps** 
    - See [WorkflowCardInstructions](#workflowcardinstructions) for more details.
- **WorkflowCardActionsProps** 
    - See [WorkflowCardActions](#workflowcardactions) for more details.

### WorkflowCardBaseProps

- **BoxProps** 
    - See [Box](https://mui.com/components/box/) for more details.
- **loading** (optional)
    - A boolean that indicates whether the loading spinner should be displayed.
    - **Type:** `boolean`
    - **Default:** `false`
- **backgroundImage** (optional)
    - The background image to display in the card.
    - **Type:** `string`
- **error** (optional)
    - A boolean that indicates whether the error dialog should be displayed.
    - **Type:** `boolean | string`
    - **Default:** `false`

---
# WorkflowCardHeader

## Description
Component that renders a header for the workflow card.

## Usage
```tsx
import { WorkflowCard, WorkflowCardHeader } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <WorkflowCard>
      <WorkflowCardHeader />
    </WorkflowCard>
  );
};
```

## API

- **CardHeaderProps** 
    - See [CardHeader](https://mui.com/components/cards/#cardheader) for more details.

---
# WorkflowCardBody

## Description
Component that renders the body content for the workflow card.

## Usage
```tsx
import { WorkflowCard, WorkflowCardBody } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <WorkflowCard>
      <WorkflowCardBody>
        {children}
      </WorkflowCardBody>
    </WorkflowCard>
  );
};
```

---
# WorkflowCardInstructions

## Description
Component that renders instructions for the workflow card.

## Usage
```tsx
import { WorkflowCard, WorkflowCardBody, WorkflowCardInstructions } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <WorkflowCard>
      <WorkflowCardBody>
        <WorkflowCardInstructions divider/>
      </WorkflowCardBody>
    </WorkflowCard>
  );
};
```

## API

- **TypographyProps** 
    - See [Typography](https://mui.com/components/typography/) for more details.
- **instructions** (optional)
    - The instructions to display in the card.
    - **Type:** `string | JSX.Element`
- **divider** (optional)
    - A boolean that indicates whether a divider should be displayed.
    - **Type:** `boolean`
    - **Default:** `false`

---
# WorkflowCardActions

## Description
Component that renders actions for the workflow card.

## Usage
```tsx
import { WorkflowCard, WorkflowCardActions } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <WorkflowCard>
        <WorkflowCardActions />
    </WorkflowCard>
  );
};
```

## API

- **CardActionsProps** 
    - See [CardActions](https://mui.com/components/card-actions/) for more details.
- **divider** (optional)
    - A boolean that indicates whether a divider should be displayed.
    - **Type:** `boolean`
    - **Default:** `false`
- **canGoNext** (optional)
    - A boolean or function that indicates whether the next button should be enabled.
    - **Type:** `boolean | (() => boolean)`
    - **Default:** `true`
- **canGoPrevious** (optional)
    - A boolean or function that indicates whether the previous button should be enabled.
    - **Type:** `boolean | (() => boolean)`
    - **Default:** `true`
- **showPrevious** (optional)
    - A boolean that indicates whether the previous button should be displayed.
    - **Type:** `boolean`
    - **Default:** `true`
- **showNext** (optional)
    - A boolean that indicates whether the next button should be displayed.
    - **Type:** `boolean`
    - **Default:** `true`
- **previousLabel** (optional)
  - The label to display for the previous button.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:COMMON.PREVIOUS')`
- **nextLabel** (optional)
  - The label to display for the next button.
  - **Type:** `string`
  - **Default:** `t('bluiAuth:COMMON.NEXT')`
- **onPrevious** (optional)
    - A function that is called when the previous button is clicked.
    - **Type:** `() => void`
- **onNext** (optional)
    - A function that is called when the next button is clicked.
    - **Type:** `() => void`
- **currentStep** (optional)
    - The current step in the workflow.
    - **Type:** `number`
    - **Default:** `0`
- **totalSteps** (optional)
    - The total number of steps in the workflow.
    - **Type:** `number`
    - **Default:** `0`
- **fullWidthButton** (optional)
    - A boolean that indicates whether the next button should be full width.
    - **Type:** `boolean`
    - **Default:** `false`