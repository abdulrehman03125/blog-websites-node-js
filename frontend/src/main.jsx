import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {CheckAuthProvider } from './context/CheckAuth.jsx';



createRoot(document.getElementById('root')).render(
  <CheckAuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CheckAuthProvider>
)
