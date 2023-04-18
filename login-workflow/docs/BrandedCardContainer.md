# Branded Card Container

The `<BrandedCardContainer>` component is used to display the Material UI's [`Card`](https://mui.com/material-ui/api/card/) component at the center of the screen.

<img width='100%' alt="Stepper Card" src="../media/contact_support.png">

## Usage

```tsx
import { BrandedCardContainer } from '@brightlayer-ui/react-auth-workflow';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

<BrandedCardContainer>
    <CardHeader title={<Typography>Title</Typography>}/>
    <CardContent>
        {/* Main content to go in the CardContent */}
    </CardContent>
    <CardActions>
        <Button>Okay</Button>
    </CardActions>
</BrandedCardContainer>;
```

## API

<div style="overflow: auto">

| Prop Name | Description                    | Type      | Required | Default |
| --------- | ------------------------------ | --------- | -------- | ------- |
| loading   | Prop to set `Spinner` visible  |  `boolean`  | no       | false   |
| classes   | Style overrides                | `BrandedCardContainerClasses`            | no       |           |
| backgroundImage | Prop to set background image |  `string`  | no       | [defaultBackgroundImage](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/src/assets/images/background.svg)   |
| cardStyles | Style overrides for `Card` component |  `SxProps<Theme>`  | no       |    |
| CardProps | Props to pass to `Card` component |  `CardProps`  | no       |    |
| loaderComponent | Loader to be displayed  |  `ReactNode`  | no       | `<Spinner />`   |
| slots | Prop used for each slot in `BrandedCardContainer`  |  `{card: React.ElementType; loader: React.ElementType}`  | no      | {}  |
| slotProps | Props applied to each slot  | `{card: CardProps; loader: React.PropsWithChildren}`  | no       | {}   |


</div>

Any other props supplied will be provided to the root element ([`<Box>`](https://mui.com/material-ui/api/box/)).

### Style Overrides

You can override the default styles used by Brightlayer UI by:

-   using the `sx` prop
-   passing a `classes` prop with keys from the Name column below
-   using the Global CSS Class in your main stylesheet

<p>For more details on styling options check out our <a href={`https://github.com/etn-ccis/blui-react-component-library/blob/master/docs/src/shared/markdown/StyleOverridesGuide.md`}>Styling Guide</a>.</p>

<Box>

| Name  | Global CSS Class                | Description                         |
| ----- | ------------------------------- | ----------------------------------- |
| root  | .BluiBrandedCardContainer-root  | Styles applied to the root element  |
| card  | .BluiBrandedCardContainer-card  | Styles applied to the card element  |

</Box>
