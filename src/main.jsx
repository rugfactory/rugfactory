import { Buffer } from 'buffer';

// Ensure Buffer is available globally before any other imports
if (!window.Buffer) {
  window.Buffer = Buffer;
}
globalThis.Buffer = Buffer;

// Initialize ethereum provider if not present
if (typeof window.ethereum === 'undefined') {
  window.ethereum = null;
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);