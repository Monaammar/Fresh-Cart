import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Toaster } from 'react-hot-toast';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient=new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster/>
    </QueryClientProvider>
);

