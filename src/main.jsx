import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Smoothly reveal root once React has mounted and CSS is active, preventing any layout flicker
requestAnimationFrame(() => {
  rootEl.classList.add('loaded');
});
setTimeout(() => {
  if (rootEl && !rootEl.classList.contains('loaded')) {
    rootEl.classList.add('loaded');
  }
}, 50);
