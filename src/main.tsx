
window.addEventListener('error', (event) => {
  document.body.innerHTML = '<div style="color:red;padding:20px;font-family:sans-serif;"><h1>Runtime Error!</h1><pre>' + event.error.stack + '</pre></div>';
});
window.addEventListener('unhandledrejection', (event) => {
  document.body.innerHTML = '<div style="color:red;padding:20px;font-family:sans-serif;"><h1>Unhandled Promise Rejection!</h1><pre>' + event.reason + '</pre></div>';
});

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
