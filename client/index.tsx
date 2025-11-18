
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './src/App';

import appConfig from "./app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

const rootElement = document.getElementById('app');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
