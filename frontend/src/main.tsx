import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/stylesheets/style.css';
import '@/stylesheets/fonts.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);