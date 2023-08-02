# Language Support

This package supports translations to different languages using [i18next](https://www.i18next.com/) / [react-i18next](https://github.com/i18next/react-i18next). The workflow screens are currently available in:

-   English
-   French
-   Portuguese
-   Spanish
-   Simplified Chinese

## Add/Override translations with our workflow

To add i18n in your application you can follow the instructions from [official website](https://react.i18next.com/getting-started).

If you want to add/override your custom screens translations in our `Auth Workflow` you need to pass your app's `i18n instance` to `AuthContextProvider` via prop name `i18n`.

```tsx
import { i18nAppInstance } from './i18nAppInstance';

<AuthContextProvider
    ...
    i18n={i18nAppInstance}
>
```

Same for `Registraion workflow` you can pass via `i18n` prop.

```tsx
import { i18nAppInstance } from './i18nAppInstance';

<RegistrationContextProvider
    ...
    i18n={i18nAppInstance}
>
```