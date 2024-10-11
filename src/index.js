import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from './ThemeContext';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider> 
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
