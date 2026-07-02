import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ExposureProvider } from './contexts/ExposureContext';
import AppRoutes from './routes/AppRoutes';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ExposureProvider>
        <AppRoutes />
      </ExposureProvider>
    </BrowserRouter>
  </React.StrictMode>
);
