import 'react-app-polyfill/ie11';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import 'react-app-polyfill/stable';
import React from 'react';
import * as serviceWorker from './serviceWorker';
import { App } from './App';
import CssBaseline from '@mui/material/CssBaseline';
import * as BLUIThemes from '@brightlayer-ui/react-themes';
import '@brightlayer-ui/react-themes/open-sans';
import './index.css';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container || document.createDocumentFragment());

root.render(
    // Enable Strict Mode for more error checking
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={createTheme(BLUIThemes.blue)}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
