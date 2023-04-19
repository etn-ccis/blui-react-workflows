# Contact Support

The `<ContactSupport>` component is used to display the support information needed by user.

<img width='100%' alt="Stepper Card" src="../media/contact_support.png">

## Usage

```tsx
import { ContactSupport } from '@brightlayer-ui/react-auth-workflow';

<ContactSupport />
```

## API

<div style="overflow: auto">

| Prop Name                             | Description                                               | Type                                                              | Required | Default                                                                     |
| ------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- | -------- | --------------------------------------------------------------------------- |
| title                                 | The text to show in the header                            | `string`                                                          | no       | Contact Us                                                                  |
| TitleProps                            | Props to pass to `title`                                  | `TypographyProps`                                                 | no       |                                                                             |
| Actions                               | Actions to display inside `CardActions`                   | `JSX.Element\|JSX.Element[]`                                      | no       | `<Button>Okay</Button>`                                                     |
| divider                               | Optional divider which appears above `Actions`            | `boolean`                                                         | no       | `true`                                                                      |
| ContactSupportContent                 | Element to display the contact support content            | `JSX.Element`                                                     | no       | `<CardContent>...</CardContent>`                                            |
| CardHeaderProps                       | Props to pass to `CardHeader`                             | `CardHeaderProps`                                                 | no       |                                                                             |
| CardContentProps                      | Props to pass to `CardContent`                            | `CardContentProps`                                                | no       |                                                                             |
| CardActionsProps                      | Props to pass to `CardActions`                            | `CardActionsProps`                                                | no       |                                                                             |
| phoneNumber                           | The text to override contact phone number                 | `string`                                                          | no       | 1-800-123-4567                                                              |
| emailId                               | The text to override contact email id                     | `string`                                                          | no       | something@email.com                                                         |
| contactSupportQuestion                | The text to override contact support question             | `string`                                                          | no       | General Questions                                                           |
| contactSupportMessage                 | The text to override contact support message              | `string`                                                          | no       | For questions, feedback, or support please email us at something@email.com. |
| contactSupportEmergency               | The text to override contact support emergency support    | `string`                                                          | no       | Emergency Support                                                           |
| contactSupportTechnicalAssistance     | The text to override contact support technical assistance | `string`                                                          | no       | For technical support, please call 1-800-123-4567.                          |
| ContactSupportIcon                    | A component to render the icon                            | `ReactNode`                                                       | no       | `<ChatBubbleOutline />`                                                     |
| hideTitle                             | Prop to hide `title`                                      | `boolean`                                                         | no       | `false`                                                                     |
| hideContactSupportContent             | Prop to hide `ContactSupportContent`                      | `boolean`                                                         | no       | `false`                                                                     |
| hideContactSupportIcon                | Prop to hide `ContactSupportIcon`                         | `boolean`                                                         | no       | `false`                                                                     |
| hideContactSupportQuestion            | Prop to hide `contactSupportQuestion`                     | `boolean`                                                         | no       | `false`                                                                     |
| hideContactSupportMessage             | Prop to hide `contactSupportMessage`                      | `boolean`                                                         | no       | `false`                                                                     |
| hideContactSupportEmergency           | Prop to hide `contactSupportEmergency`                    | `boolean`                                                         | no       | `false`                                                                     |
| hideContactSupportTechnicalAssistance | Prop to hide `contactSupportTechnicalAssistance`          | `boolean`                                                         | no       | `false`                                                                     |
| hideActions                           | Prop to hide `Actions`                                    | `boolean`                                                         | no       | `false`                                                                     |
| showInCard                            | Prop to wrap `ContactSupport` in `BrandedCardContainer`   | `boolean`                                                         | no       | `true`                                                                      |
| classes                               | Style overrides                                           | `ContactSupportClasses`                                           | no       | {}                                                                          |
| slots                                 | Prop used for each slot in `ContactSupport`               | `{cardHeader: React.ElementType; cardContent: React.ElementType}` | no       | {}                                                                                                                                     |
| slotProps                             | Props applied to each slot                                | `{cardHeader: CardHeaderProps; cardContent: CardContentProps}`    | no       | {}                                                                                                                                     |


</div>

### Style Overrides

You can override the default styles used by Brightlayer UI by:

-   using the `sx` prop
-   passing a `classes` prop with keys from the Name column below
-   using the Global CSS Class in your main stylesheet

<p>For more details on styling options check out our <a href={`https://github.com/etn-ccis/blui-react-component-library/blob/master/docs/src/shared/markdown/StyleOverridesGuide.md`}>Styling Guide</a>.</p>

<Box>

| Name        | Global CSS Class                | Description                                 |
| ----------- | ------------------------------- | ------------------------------------------- |
| cardHeader  | .BluiContactSupport-cardHeader  | Styles applied to the card header element   |
| cardContent | .BluiContactSupport-cardContent | Styles applied to the card content element  |
| cardActions | .BluiContactSupport-cardActions | Styles applied to the card actions element  |


</Box>