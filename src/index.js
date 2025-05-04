import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './utils/ErrorBoundary';
import AuthProvider from './features/auth/AuthProvider'; 

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary><App /></ErrorBoundary>
      </AuthProvider>
     </BrowserRouter>
     </QueryClientProvider>
   </React.StrictMode>
);

reportWebVitals();
