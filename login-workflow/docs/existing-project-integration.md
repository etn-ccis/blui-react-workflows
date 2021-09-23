# Integrating Into an Existing Project

To start integrating this package into an existing application, you must first have an application. We recommend using the [PX Blue CLI](https://www.npmjs.com/package/@pxblue/cli) to initialize your project. 


#### Installation and Setup

Once you have a project, you can install this package via:
```shell
npm install --save @pxblue/react-auth-workflow
// or
yarn add @pxblue/react-auth-workflow
```

This package also has a number of peer dependency requirements that you will also need to install in your project. To install the latest version of all of these peer dependencies, run the following command in your project root:
```
npm install --save @material-ui/core @pxblue/colors @pxblue/react-components date-fns i18next react-dom react-i18next react-router-dom
// or
yarn add @material-ui/core @pxblue/colors @pxblue/react-components date-fns i18next react-dom react-i18next react-router-dom
```

#### Implement AuthUIActions and RegistrationUIActions

You need to implement the backend networking for all networking within react-auth-workflow. Your implementation will likely involve writing calls to your APIs and caching the returned data, as needed, depending on the requirements of your application. The example application has these actions mocked with calls to `sleep`.

1. Create a `/src` folder in your application if it does not already exist
2. Add an `/actions` folder inside the `src` directory.
3. Create two files in the new `actions` directory: `AuthUIActions.tsx` and `RegistrationUIActions.tsx`
    - The first file you created, `AuthUIActions.tsx`, will handle the implementation of the authentication related actions (such as login and forgot password).
    - The second file you created, `RegistrationActions.tsx`, will handle the implementation of the registration related actions (such as loading the EULA and registration by invitation).
    - You can copy these files directly from the [example](https://github.com/pxblue/react-workflows/tree/master/login-workflow/example) project as a starting point and then update the implementation details if you choose.
4. You might also want to copy over the `example/src/store` and `example/src/constants` folders from react-auth-workflow for the purposes of compiling with the mock `AuthUIActions` and `RegistrationUIActions` before you write your own implementation. These sample implementations make use of the browser LocalStorage, but you may want to use a different approach in order to follow best practices for cybersecurity.
5. Import the actions in your root app file (usually App.tsx):
```
import { ProjectAuthUIActions } from './src/actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './src/actions/RegistrationUIActions';
```


#### Setting Up the Application Structure

1. In the root app file (generally App.tsx), add the following imports to the top of the file:

    ```tsx
    import {
        SecurityContextProvider,
        AuthNavigationContainer,
        AuthUIContextProvider,
        useSecurityActions,
    } from '@pxblue/react-auth-workflow';
    ```
2. Inside your root export, wrap your entire application as follows, where `<YourApp>` is your existing app structure XML (if you used the PX Blue CLI to create your project, the `ThemeProvider` should already be configured. If you didn't, you can skip those wrappers or follow the manual [integration instructions](https://pxblue.github.io/development/frameworks-web/react)):

```tsx
<ThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
    <CssBaseline />
    <SecurityContextProvider>
        <AuthUIConfiguration>
            <AuthNavigationContainer /*routeConfig={routes}*/>
                <YourApp />    <--- Your existing app
            </AuthNavigationContainer>
        </AuthUIConfiguration>
    </SecurityContextProvider>
</ThemeProvider>
``` 


#### Configure AuthUIContextProvider

Create a functional component in your root app file that configures the options for the React Auth Workflow package. The component definition should look something like this:

```tsx
export const AuthUIConfiguration = (props) => {
    const securityContextActions = useSecurityActions();
    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            showSelfRegistration={true}
            allowDebugMode={true}
            htmlEula={false}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            projectImage={require('./src/assets/images/some_image.png')}
        >
            {props.children}
        </AuthUIContextProvider>
    );
}
```
You can skip passing the `projectImage` property if you don't have one yet.

You can read more about customizing the `AuthUIContextProvider` in the [Customization Guide](https://github.com/pxblue/react-workflows/tree/master/login-workflow/docs/customization.md) 

The various configuration options are explained in more detail in the [API](https://github.com/pxblue/react-workflows/tree/master/login-workflow/docs/API.md) documentation.
