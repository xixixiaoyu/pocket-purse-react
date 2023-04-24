import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import 'virtual:uno.css';
import 'virtual:svgsprites';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
