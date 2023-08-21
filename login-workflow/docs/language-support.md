# Language Support

This package supports translations to different languages using [i18next](https://www.i18next.com/) / [react-i18next](https://github.com/i18next/react-i18next). The workflow screens are currently available in:

-   English
-   French
-   Portuguese
-   Spanish
-   Simplified Chinese

Workflow dictionaries are independent of the user application dictionaries. However, you can add a new language other than above mentioned languages. For more details, refer to the section [Add New language within our workflow](#add-new-language-within-our-workflow).

## Query String

If you navigate to your application URL and append the `lng` query string, the specified language will be loaded:

```
https://www.yourwebsite.com/page?lng=fr
```

## Local Storage

You can also manually modify the value that is stored in Local Storage to edit or remove the stored value. Removing the value will tell the application to default to the browser default value.

```tsx
localStorage.setItem('blui-i18nextLng', 'fr');
localStorage.removeItem('blui-i18nextLng');
```

## Add/Override translations within our workflow

To add i18n in your application you can follow the instructions from [official website](https://react.i18next.com/getting-started).
You need to wrap your app with <I18nextProvider/> for rendering translations in the app. For reference, you can check [I18nextProvider](https://react.i18next.com/latest/i18nextprovider).


If you want to use keys from your application dictionary in any of the workflow screens or any custom screens that you provide within the Auth or Registration workflows, you need to pass your app's i18n instance to the `AuthContextProvider` and/or `RegistrationContextProvider` via the `i18n` prop.

```tsx
import { i18nAppInstance } from './i18n';

<AuthContextProvider
    ...
    i18n={i18nAppInstance}
>
```

`Registration workflow` works in the same way, allowing you to pass an i18n instance via the `i18n` prop.

```tsx
import { i18nAppInstance } from './i18n';

<RegistrationContextProvider
    ...
    i18n={i18nAppInstance}
>
```
If you need to override any of the translations used internally in any of the components or screens, you can use the `t` function from `react-i18next` and pass the translation key.
For example, if you want to override the default `Email` label of the `<ForgotPasswordScreen />` component you can pass the key `EMAIL` to the `t` function without namespace. It will take the default namespace which you declare while creating an i18n instance.
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<ForgotPasswordScreen emailLabel={`${t('EMAIL')}`} />
```

## Add New language within our workflow

To add a new languages other than English, French, Portuguese, Spanish, and Simplified Chinese. You need to add your own translation dictionary which will have our existing translation keys.

For adding a new language with all translation keys of workflow, you can do it the same as below. The below example is only having a few keys to our workflow. You need to use all resource IDs to translate the complete workflow.

```tsx
// Auth Workflow Keys
const bluiAuthResources =  {
    translation: {
        SETTINGS: {
            TITLE: '제목',
        },
    },
}
// Common Keys used in Auth and Registration Workflow
const bluiCommonResources =  {
    translation: {
        ACTIONS: {
            NEXT: '다음',
        },
    },
}
// Registration Workflow Keys
const bluiRegistrationResources = {
    translation: {
        REGISTRATION: {
            EULA: {
                LOADING: '최종 사용자 라이선스 계약 로드 중...',
            },
        },
    },
};

export const i18nAppInstance = i18next.createInstance(
    {
        ...
        resources: {
            ...
            kr: {
                app: {
                    ...AppDictionaries.korean.translation,
                },
                bluiAuth: {
                    ...AppDictionaries.korean.bluiAuthResources.translation,
                },
                bluiRegistration: {
                    ...AppDictionaries.korean.bluiRegistrationResources.translation,
                },
                bluiCommon: {
                    ...AppDictionaries.korean.bluiCommonResources.translation,
                },
            },
        },
    },
);
```

> For a complete list of resource IDs available, refer to the documentation for 
[Authentication Workflow](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/src/new-architecture/contexts/AuthContext/AuthDictionaries/english.ts).
[Registration Workflow](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/src/new-architecture/contexts/RegistrationContext/RegistrationDictionaries/english.ts).
[Common translations](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/src/new-architecture/contexts/SharedDictionaries/english.ts).