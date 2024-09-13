// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Update import
import App from './App';
import './index.css';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
