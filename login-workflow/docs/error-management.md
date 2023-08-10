# Error Management

In order to give you more control over how error messages are displayed we employed a few methods of configuring error messages throughout the application.

## TextField Validator Errors

Text fields within the workflow have built in validator methods that you can use out of the box or customize. For more information on each screens validator functions, read our [Screens](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens.md) documentation.

### Custom Usage (using Login as an example)

If you want to provide a custom validator you can import any of our components and pass in the appropriate validator prop. If, for example, you want to provide a custom usernameValidator you can import the `<LoginScreen>` and pass in a `usernameValidator` function. If the function returns true, no message will be displayed. If the function returns false, the text field will be rendered in an error state with no additional text. If the function returns a string, the text field will be rendered in an error state with the return text displayed below the text field.

```tsx
...
const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
...

<LoginScreen
    ...
    usernameValidator = (username: string): string | boolean => {
            if (!EMAIL_REGEX.test(username)) {
                return 'custom error message';
            }
            return true;
        },
>
```

## API Error Configuration

In order to handle errors throughout the auth workflow we have provided an `ErrorManager` component that is embedded in each screen that makes an API call. You can customize errors in multiple ways. By default the `ErrorManager` uses a dialog to present errors to the end user. The easiest way to customize how the dialog is presented is by throwing an error with a `cause` object in the Error options. For more details on the errorManager API, read the [ErrorManager](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/error-manager.md) docs.

### Usage
To throw an error in a dialog with a custom title and error message throw the error as follows:

```tsx
throw new Error('My Custom Error', {
    cause: {
        title: 'Custom Title',
        errorMessage: 'My custom error message',
    },
});
```

You can still throw your error with just a message and the title will show the default "Error" text:

```tsx
throw new Error('My Custom Error');
```

### Global Error Configuration

You can configure how errors are rendered throughout the entire workflow by adding an errorConfig object as a prop directly on the Auth or Registration context providers.

#### Usage

```tsx
<AuthContextProvider
    ...
    errorConfig={{
        mode: 'message-box',
        messageBoxConfig: {
            dismissible: true,
            position: 'top',
        },
    }}
>
```

### Granular Error Configuration

You can configure how errors are rendered on each individual screen by adding an errorConfig object as a prop directly on a screen component.

#### Usage

```tsx
<LoginScreen
    ...
    errorConfig={{
        mode: 'message-box',
        messageBoxConfig: {
            dismissible: true,
            position: 'top',
        },
    }}
>
```