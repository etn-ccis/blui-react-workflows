# Error Management

In order to give you more control over how error messages are displayed we employed a few methods of configuring error messages throughout the application.

### TextField Validator Errors

Text fields within the workflow have built in validator methods that you can use out of the box or customize. For more information on each screens validator functions, read our [Screens](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens.md) documentation.

#### Custom Usage (using Login as an example)

If you want to provide a custom validator you can import any of our components and pass in the appropriate validator prop. If, for example, you want to provide a custom usernameValidator you can import the `<LoginScreen>` and pass in a `usernameValidator` function. If the function returns true no message will be displayed. If the function returns false, no message will be displayed, but the text field will be rendered in an error state. If the function returns a string, the text field will be rendered in an error state with the return text displayed below the text field.

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

### Error Configuration

#### Global Error Configuration

#### Granular Error Configuration