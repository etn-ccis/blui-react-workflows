# StepperCard

The `<StepperCard>` component is used to display the Material UI's [`Card`](https://mui.com/material-ui/api/card/) component at the center of the screen.

<img width='100%' alt="Stepper Card" src="../media/contact_support.png">

## Usage

```tsx
import { StepperCard } from '@brightlayer-ui/react-auth-workflow';

<StepperCard>
    {/* Main content to go in the StepperCard */}
</StepperCard>;
```

## API

<div style="overflow: auto">

| Prop Name | Description                    | Type      | Required | Default |
| --------- | ------------------------------ | --------- | -------- | ------- |
| loading   | Prop to set `Spinner` visible  |  boolean  | no       | false   |
| backgroundImage | Prop to set background image |  string  | no       |    |
| sx | Style overrides for `StepperCard` |  SxProps<Theme>  | no       |    |
| cardStyles | Style overrides for `Card` component |  SxProps<Theme>  | no       |    |
| loaderComponent | Loader to be displayer  |  ReactNode  | no       | `<Spinner />`   |





</div>