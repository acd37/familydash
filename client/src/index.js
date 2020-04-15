import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// ui theme
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: ['Roboto', 'sans-serif'].join(',')
    },
    palette: {
        primary: {
            main: '#00b894',
            secondary: '#55efc4',
            dark: '#1b2531',
            darkAccent: '#24303f',
            contrastText: 'rgb(244, 245, 247)'
        }
    },
    overrides: {
        MuiCard: {
            root: {
                boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
                borderRadius: 6,
                color: 'rgba(0, 0, 0, 0.87)',
                overflow: 'inherit'
            }
        },
        MuiButton: {
            text: {
                backgroundColor: '#54a0ff',
                width: 150,
                fontWeight: 600,
                letterSpacing: 1,
                color: '#fff',
                boxShadow: 'none',
                padding: '10px 20px',
                marginBottom: '10px',
                '&:hover': {
                    backgroundColor: '#2e86de'
                }
            }
        }
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
);
serviceWorker.unregister();
