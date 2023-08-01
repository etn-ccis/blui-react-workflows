# BasicDialog

## Description
Component that renders a basic dialog. This component provides a title, a body, and a close button.

## Usage
```tsx
import { SimpleDialog } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <SimpleDialog 
      title="Notice!"
      body="This is an example notice"
      onClose={() => console.log('close')}  
    />
  );
};
```

## API

 - **DialogProps** 
   - See [Dialog](https://mui.com/material-ui/react-dialog/) for more details.
 - **title** 
   - The title to display in the dialog.
   - **Type:** `string`
 - **body** 
   - The body to display in the dialog.
   - **Type:** `string`
 - **onClose** 
   - A function that is called when the close button is clicked.
   - **Type:** `() => void`
 - **dismissButtonText** (optional)
   - The text to display in the close button.
   - **Type:** `string`
   - **Default:** `t('bluiAuth:COMMON.DISMISS')`