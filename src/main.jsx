import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './states';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
