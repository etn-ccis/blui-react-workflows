# Accept Eula

The `<AcceptEula>` component that renders a screen displaying the EULA and requests acceptance via a checkbox.

<img width='100%' alt="Accept Eula" src="../media/accept_eula.png">

## Usage

```tsx
import { useState } from 'react';
import { AcceptEula } from '@brightlayer-ui/react-auth-workflow';

const [eulaAccepted, setEulaAccepted] = useState(false);

<AcceptEula 
    eulaAccepted={eulaAccepted} 
    onEulaCheckboxChanged={setEulaAccepted} 
    loadEula={()=>{ // ...Load the Eula if we do not yet have the content }} 
/>
```

## API

<div style="overflow: auto">

| Prop Name                | Description                                                | Type                                                                                                     | Required | Default                                           |
| ------------------------ | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------- |
| eulaAccepted             | Prop to check the checkbox                                 | `boolean`                                                                                                | yes      |                                                   |
| eulaContent              | The content to render for the EULA                         | `string`                                                                                                 | no       |                                                   | 
| onEulaCheckboxChanged            | Function to call when the state of the checkbox is changed | `function`                                                                                               | yes      |                                                   |
| loadEula                 | Function to call to retrieve the eulaContent               | `function`                                                                                               | yes      |                                                   |
| htmlEula                 | Prop to render EULA as HTML                                | `boolean`                                                                                                | no       |                                                   |
| eulaError                | Error message if the EULA fails to load                    | `string`                                                                                                 | no       |                                                   |
| agreeTerms               | Prop to override terms and conditions text                 | `string`                                                                                                 | no       | "I have read and agree to the Terms & Conditions" | 
| termsAndConditionsStyles | Prop to override terms and conditions styles               | `SxProps<Theme>`                                                                                         | no       |                                                   |
| eulaContentStyles        | Prop to override eula content styles                       | `SxProps<Theme>`                                                                                         | no       |                                                   |
| EulaContentProps         | Props to pass to the eula content                          | `BoxProps`                                                                                               | no       |                                                   |
| loaderText               | Text to display when EULA is loading                           | `string`                                                                                                 | no       | "Loading End User License Agreement..."           |
| LoaderTextProps          | Props to pass to the loader content                        | `TypographyProps`                                                                                        | no       |                                                   |
| loaderStyles             | Prop to override the loader styles                         | `SxProps<Theme>`                                                                                         | no       |                                                   |
| classes                  | Style overrides                                            | `AcceptEulaClasses`                                                                                      | no       |                                                   |
| slots                    | Prop used for each slot in `BrandedCardContainer`          | `{loaderText: React.ElementType; eulaContent: React.ElementType; termsAndConditions: React.ElementType}` | no       | {}                                                |
| slotProps                | Props applied to each slot                                 | `{loaderText: TypographyProps; eulaContent: BoxProps; termsAndConditions: FormControlLabelProps}`        | no       | {}                                                |

</div>

### Style Overrides

You can override the default styles used by Brightlayer UI by:

-   using the `sx` prop
-   passing a `classes` prop with keys from the Name column below
-   using the Global CSS Class in your main stylesheet

<p>For more details on styling options check out our <a href={`https://github.com/etn-ccis/blui-react-component-library/blob/master/docs/src/shared/markdown/StyleOverridesGuide.md`}>Styling Guide</a>.</p>

<Box>

| Name               | Global CSS Class                   | Description                                     |
| ------------------ | ---------------------------------- | ----------------------------------------------- |
| loaderText         | .BluiAcceptEula-loaderText         | Styles applied to the loader text element       |
| eulaContent        | .BluiAcceptEula-eulaContent        | Styles applied to the eula content element      |
| termsAndConditions | .BluiAcceptEula-termsAndConditions | Styles applied to the terms and content element |

</Box>
