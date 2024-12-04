# Using the Theme in your Project

This guide will help you integrate and use the @brightlayer-ui/react-theme in your project.

## Setup

**Install Dependencies:**

Install with npm

```shell
npm install --save @brightlayer-ui/react-themes
```

or yarn

```shell
yarn add @brightlayer-ui/react-themes
```

# Usage

To use these themes in your application, simply wrap the app in a `ThemeProvider` and pass in the theme.:

```tsx
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { App } from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { blueThemes } from '@brightlayer-ui/react-themes';
import '@brightlayer-ui/react-themes/open-sans';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container || document.createDocumentFragment());

root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={blueThemes}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);
```

By Default the theme will take system's mode. To set your mode(light/dark), make use of `useColorScheme()` hook to set and use theme modes using helpers `mode` & `setMode` of `useColorScheme()`.

## Example to use useColorScheme() hook

```tsx
import { useEffect } from 'react';
import { useColorScheme } from '@mui/material/styles';

export const App = (): JSX.Element => {
    const { setMode } = useColorScheme();

    useEffect(() => {
        setMode('light');
    }, []);

    return (
        <>
            <BrowserRouter basename={'/'}>
                <AppRouter />
            </BrowserRouter>
        </>
    );
};
```
