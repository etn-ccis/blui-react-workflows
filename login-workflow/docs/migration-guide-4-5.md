# Migration Guide: v4.x => v5.x

## Change Password Dialog prop update 

We have removed `errorDialogProps` from change password dialog props and added `errorDisplayConfig` of error manager prop type.

To trigger the ErrorManager to display an error, you need to throw an error in your AuthUIAction.

```tsx
// throw a basic error
throw new Error('My Custom Error');

// customize the title via the cause property
throw new Error('My Custom Error', {
    cause: {
        title: 'Custom Title',
        errorMessage: 'My custom error message',
    },
});

<ChangePasswordDialog
    {...otherProps}
    errorDisplayConfig={{
        mode: 'message-box',
        messageBoxConfig: {
            dismissible: true,
            position: 'top',
        },
    }}
>
```

Refer to the [Example](../example/) application for detailed reference.
