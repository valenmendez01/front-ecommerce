import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <ToastProvider
          maxVisibleToasts={3}
          placement="top-right"
          toastProps={{ radius: 'sm', timeout: 3500, variant: 'flat' }}
        />
        <AuthProvider>
          <App />
        </AuthProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,
)
