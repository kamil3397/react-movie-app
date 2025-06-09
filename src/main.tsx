import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MovieProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MovieProvider>
  </StrictMode>,
)
