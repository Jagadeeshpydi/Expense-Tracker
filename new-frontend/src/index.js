// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ExpenseProvider } from './context/ExpenseContext'; // Adjust path if needed

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </React.StrictMode>
);
