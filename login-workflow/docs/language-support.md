# Language Support

This package supports translations to different languages using [i18next](https://www.i18next.com/) / [react-i18next](https://github.com/i18next/react-i18next). The workflow screens are currently available in:

-   English
-   French
-   Spanish
-   Simplified Chinese

## Changing the Language

The authentication workflow configures i18next to store the most recently used language in local storage (`pxb-i18nextLng`) so that when the app is loaded again, it will default to the last language used. There are three ways that you can change this stored value.

### 1. ChangeLanguage Function (recommended)

The i18next package provides a function you can call to change the current language:

```tsx
import i18n from 'i18next';

i18n.changeLanguage('fr'); // 'en', 'es', 'fr'
```

### 2. Query String

If you navigate to your application URL and append the `lng` query string, the specified language will be loaded:

```
https://www.yourwebsite.com/page?lgn=fr
```

### 3. Local Storage

You can also manually modify the value that is stored in Local Storage to edit or remove the stored value. Removing the value will tell the application to default to the browser default value.
All applications using the @pxblue/react-auth-workflow will use the same localstorage key when doing this lookup. In order to avoid possible interference with other applications, we recommend using the ChangeLanguage function (#1) instead of relying on localstorage.

```tsx
localStorage.setItem('pxb-i18nextLng', 'fr');
localStorage.removeItem('pxb-i18nextLng');
```

> If you are planning to provide user-specific language settings for your application, you will be responsible for manipulating the value in localStorage in order to properly reflect a user's setting when loading the application.

## Adding Your Own Resources

If you intend to support multiple languages in your application, you will need to provide translations for all of the UI string resources used in your application (refer to the [documentation](https://www.i18next.com/overview/getting-started) for i18next for specific information on how to build translation files).

The Auth Workflow is configured with two separate namespaces for resources:

-   The `pxb` namespace contains strings that are used internally in the workflow screens
-   The `app` namespace is where your app-specific UI strings are placed

> The `app` namespace is set as the default so that you do not need to prefix any of your resource IDs.

To load your resources into the i18next object, you can call:

```tsx
import i18n from 'i18next';

i18n.addResourceBundle('en', 'app', { BUTTONLABEL: 'Change Language' });
i18n.addResourceBundle('es', 'app', { BUTTONLABEL: '¡Cambia el idioma!' });
i18n.addResourceBundle('fr', 'app', { BUTTONLABEL: 'Changez de Langue' });
```

> This will need to be called before the application renders so that the strings are available. If you cannot load these before the application renders, you will need to force the app to refresh after they are loaded to pick up the values.

### Using translations in your application

To use the appropriate translations in your application, you can use the `t` function or `<Trans>` components from [react-i18next](https://github.com/i18next/react-i18next).

## Overriding default resources

If you need to override any of the strings or translations used internally in the Auth Workflow, you can do so in a similar way by specifying the pxb namespace and the appropriate resource ID:

```tsx
import i18n from 'i18next';

i18n.addResourceBundle('en', 'pxb', { ACTIONS: { CREATE_ACCOUNT: 'Register now!' } }, true, true);
i18n.addResourceBundle('es', 'pxb', { ACTIONS: { CREATE_ACCOUNT: '¡Regístrate ahora!' } }, true, true);
i18n.addResourceBundle('fr', 'pxb', { ACTIONS: { CREATE_ACCOUNT: `S'inscrire maintenant!` } }, true, true);
```

> For a complete list of resource IDs available, refer to the documentation for [@pxblue/react-auth-shared](https://github.com/pxblue/react-auth-shared/blob/master/src/data/translations/english.ts).
