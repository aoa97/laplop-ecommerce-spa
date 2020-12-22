import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css'
import './bootstrap.css'
import './index.css';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';

// Customize MUI theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#07689f'
    }
  }
});


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
