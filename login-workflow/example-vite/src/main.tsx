import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import React from 'react';
import { App } from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { blueThemes } from '@brightlayer-ui/react-themes';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
    // Enable Strict Mode for more error checking
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={blueThemes}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);
