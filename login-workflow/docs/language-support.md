# Language Support

This package supports translations to different languages using [i18next](https://www.i18next.com/) / [react-i18next](https://github.com/i18next/react-i18next). The workflow screens are currently available in:

-   English
-   French
-   Portuguese
-   Spanish
-   Simplified Chinese

## Add/Override translations within our workflow

To add i18n in your application you can follow the instructions from [official website](https://react.i18next.com/getting-started).
You need to wrap your app with <I18nextProvider/> for rendering translations in the app. For reference, you can check [I18nextProvider](https://react.i18next.com/latest/i18nextprovider).


If you want to use keys from your application dictionary in any of the workflow screens or any custom screens that you provide within the Auth or Login workflows, you need to pass your app's i18n instance to the `AuthContextProvider`/`RegistrationContextProvider` via the `i18n` prop.

```tsx
import { i18n } from './i18n';

<AuthContextProvider
    ...
    i18n={i18n}
>
```

`Registration workflow` works in the same way, allowing you to pass an i18n instance via the `i18n` prop.

```tsx
import { i18nAppInstance } from './i18n';

<RegistrationContextProvider
    ...
    i18n={i18n}
>
```

If you need to override any of the translations used internally in our Workflow, you can do it in a similar way as below.

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<ForgotPasswordScreen emailLabel={`${t('EMAIL')}`} />
```