import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Data } from './data';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Data>
      <App />
    </Data>
  </React.StrictMode>,
);
