import 'react-app-polyfill/ie11';
import { adaptV4Theme, createTheme , StyledEngineProvider} from '@mui/material/styles';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ThemeProvider from '@mui/styles/ThemeProvider';
import { App } from './App';
import CssBaseline from '@mui/material/CssBaseline';
import * as BLUIThemes from '@brightlayer-ui/react-themes';
import '@brightlayer-ui/react-themes/open-sans';
import './index.css';

ReactDOM.render(
    // Enable Strict Mode for more error checking
    <React.StrictMode>
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme(adaptV4Theme(BLUIThemes.blue))}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StyledEngineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
