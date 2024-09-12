import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import { AppDataProvider } from '@deriv-com/api-hooks';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <AppDataProvider>
                <App />
            </AppDataProvider>
        </QueryClientProvider>
    </StrictMode>
);
