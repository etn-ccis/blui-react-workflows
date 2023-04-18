# ContactSupport

The `<ContactSupport>` component is used to display the support information needed by user.

<img width='100%' alt="Stepper Card" src="../media/contact_support.png">

## Usage

```tsx
import { ContactSupport } from '@brightlayer-ui/react-auth-workflow';

<ContactSupport />
```

## API

<div style="overflow: auto">

| Prop Name | Description                    | Type      | Required | Default |
| --------- | ------------------------------ | --------- | -------- | ------- |
| title   | The text to show in the header    |  `string`  | no       | Contact Us   |
| titleProps   | Props to pass to `title`   |  `TypographyProps`  | no       |  |
| actions   | Props to pass to `title`   |  `JSX.Element | JSX.Element[]`  | `<Button>Okay</Button>`      |
| divider  | Optional divider which appears above `actions` | `boolean` | no       | `true`  |
| contactSupportContent  | Element to display the contact support content | `JSX.Element` | no       | `<CardContent>...</CardContent>`  |
| cardHeaderProps  | Optional divider which appears above `actions` | `boolean` | no       | `true`  |

</div>

Any other props supplied will be provided to the root element ([`<Box>`](https://mui.com/material-ui/api/box/)).

### Style Overrides

You can override the default styles used by Brightlayer UI by:

-   using the `sx` prop
-   passing a `classes` prop with keys from the Name column below
-   using the Global CSS Class in your main stylesheet

<p>For more details on styling options check out our <a href={`https://github.com/etn-ccis/blui-react-component-library/blob/master/docs/src/shared/markdown/StyleOverridesGuide.md`}>Styling Guide</a>.</p>

<Box>

| Name  | Global CSS Class        | Description                         |
| ----- | ----------------------- | ----------------------------------- |
| root  | .BluiStepperCard-root  | Styles applied to the root element  |
| card  | .BluiStepperCard-card  | Styles applied to the card element  |

</Box>