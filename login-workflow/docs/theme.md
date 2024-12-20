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
import React, { useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { App } from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { blueThemes } from '@brightlayer-ui/react-themes';
import rtl from 'jss-rtl';
import { create } from 'jss';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import jssPreset from '@mui/styles/jssPreset';
import '@brightlayer-ui/react-themes/open-sans';

document.body.setAttribute('dir', 'rtl');
const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
});

export const Example = (props: any): JSX.Element => {
    const dir = useSelector((store: AppStore) => store.app.direction); 

    const cacheRtl = createCache({
        key: dir === 'rtl' ? 'cssrtl' : 'cssltr',
        prepend: true,
        stylisPlugins: [rtlPlugin],
    });

    const cacheLtr = createCache({
        key: dir === 'ltr' ? 'cssltr' : 'cssrtl',
        prepend: true,
        stylisPlugins: dir === 'ltr' ? undefined : [rtlPlugin],
    });

    useEffect(() => {
        document.body.dir = dir;
    }, [dir]);

return(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={{...blueThemes, direction: dir}}>
             <CacheProvider value={dir === 'ltr' ? cacheLtr : cacheRtl}>
                <CssBaseline />
                <App />
            </CacheProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);
```

For more configuration, please refer to the [BLUI React Themes README](https://github.com/etn-ccis/blui-react-themes/blob/dev/README.md).
