# StepperCard

The `<StepperCard>` component is used to display the Material UI's [`Card`](https://mui.com/material-ui/api/card/) component at the center of the screen.

<img width='100%' alt="Stepper Card" src="../media/contact_support.png">

## Usage

```tsx
import { StepperCard } from '@brightlayer-ui/react-auth-workflow';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

<StepperCard>
    <CardHeader title={<Typography>Title</Typography>}/>
    <CardContent>
        {/* Main content to go in the CardContent */}
    </CardContent>
    <CardActions>
        <Button>Okay</Button>
    </CardActions>
</StepperCard>;
```

## API

<div style="overflow: auto">

| Prop Name | Description                    | Type      | Required | Default |
| --------- | ------------------------------ | --------- | -------- | ------- |
| loading   | Prop to set `Spinner` visible  |  boolean  | no       | false   |
| backgroundImage | Prop to set background image |  string  | no       | [defaultBackgroundImage](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/src/assets/images/background.svg)   |
| sx | Style overrides for `StepperCard` |  SxProps<Theme>  | no       |    |
| cardStyles | Style overrides for `Card` component |  SxProps<Theme>  | no       |    |
| CardProps | Props to pass to `Card` component |  CardProps  | no       |    |
| loaderComponent | Loader to be displayer  |  ReactNode  | no       | `<Spinner />`   |

</div>