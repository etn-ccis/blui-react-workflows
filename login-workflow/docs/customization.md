# Customizing the Workflow

## Login Screen

The Login screen supports some simple customization (via the `AuthUIContextProvider`) to suit the needs of your application.

-   You can pass in a custom header that will appear above the login form using the `loginHeader` prop. By default, we render your `productImage`.
-   You can pass in a custom footer that will appear below the login form and registration links with any content you like (such as links to Privacy Policy, Terms of Service, etc.) using the `loginFooter` prop.
-   You can customize the background of the workflow using the `background` prop including the color, tile image, etc.
-   You can disable and hide various aspects of the workflow using the following props: `enableInviteRegistration`, `enableResetPassword`, `showContactSupport`, `showCybersecurityBadge`, `showRememberMe`, `showSelfRegistration`.

For more details, read the [full API details](https://github.com/pxblue/react-auth-shared/tree/master/docs/API.md). 

## Additional Routes

The authentication workflow hides your application content behind a private routing mechanism that does not allow unauthenticated users to access any parts of the application. 

If there are routes that you would like to be available without logging in (such as a Terms of Service page), you need to provide these to the `AuthNavigationContainer` through the `extraRoutes` property. The content passed in here will be publicly accessible.

```tsx
<AuthNavigationContainer
    extraRoutes={
        [
            <Route exact path={'/new-route'}>
                {/* Route Content */}
            </Route>,
            <Route exact path={'/new-route-two'}>
                {/* Route Content */}
            </Route>
        ]
    }
    routeConfig={{SUPPORT: '/custom-support-url'}}
>
    <ExampleHome />
</AuthNavigationContainer>

```

You can also customize the URL used for the default routes by passing a configuration object to the `routeConfig` prop.

For more details, read the [full API details](https://github.com/pxblue/react-auth-shared/tree/master/docs/API.md). 

## Registration Details

By default, the user registration piece of the workflow will capture the minimum information that is required (i.e., First Name, Last Name, and email address).

Many applications will need to collect additional information about their users during registration. This can be achieved by passing in additional form components to the `AuthUIContextProvider` via the `customAccountDetails` prop.

### Syntax

The `customAccountDetails` prop takes an array of components that you would like to insert into the registration flow.

The first item in the array will render below the default fields (first and last name). Subsequent items will be rendered on new pages (one page per item in the array). If you do not want to render your custom elements below the default fields, you can pass `null` as the first item in the array.

```tsx
import { CustomDetailsScreen, CustomDetailsScreenTwo } from './path/to/file';
...
<AuthUIContextProvider
    customAccountDetails={[null, CustomDetailsScreen, CustomDetailsScreenTwo]}
/>
```

### Form Implementation

In order to work correctly, custom form components that you pass into the workflow must match the interface `ComponentType<AccountDetailsFormProps>`, meaning your component must accept and hook up the following three props:

-   `initialDetails` (_`CustomAccountDetails`_): this is an object of key-value pairs representing the custom data that your form captures. Each key is the name of one of your custom properties and the value is the value of that property. You must use these values to initialize your form fields on render.
-   `onDetailsChanged` (_`(details: CustomAccountDetails | null, valid: boolean) => void`_): this is a callback function that you must call whenever any of your custom properties change. You must include all your custom properties in the details object, even if some of them are unchanged. You must also include a `valid` argument that indicate whether the current values pass your required validation checks (if all fields are optional, you can simply pass `true`).
-   `onSubmit` (_`() => void`_): this function should be called when a user presses the Enter key in the final input of your custom form. This will trigger the workflow to progress to the next page without having to manually click the button.

You can see a sample implementation of the custom details forms in the `/example` project.

> **NOTE:**  If you are using a useEffect hook to call the `onDetailsChanged` function, you must make sure NOT to include the `onDetailsChanged` prop in your list of dependencies. This will cause an infinite update loop.