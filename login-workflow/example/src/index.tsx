import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { App } from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as BLUIThemes from '@brightlayer-ui/react-themes';
import '@brightlayer-ui/react-themes/open-sans';
import './index.css';

ReactDOM.render(
    // Enable Strict Mode for more error checking
    // <React.StrictMode>
    <ThemeProvider theme={createMuiTheme(BLUIThemes.blue)}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    // </React.StrictMode>
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
