import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import InformationCornerApp from './information/InformationCornerApp.tsx';
import './index.css';

const isInformationCorner = window.location.hostname.startsWith('information.');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isInformationCorner ? <InformationCornerApp /> : <App />}
  </StrictMode>
);
