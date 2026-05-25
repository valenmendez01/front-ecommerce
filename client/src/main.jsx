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
          placement="bottom-right"
          toastProps={{
            radius: 'lg',
            variant: 'bordered',
            timeout: 5000,
            shouldShowTimeoutProgress: true,
            classNames: {
              base: 'border-[#d93838] bg-[#fff5f5] text-[#8f1d1d] shadow-xl shadow-[#8f1d1d]/10',
              title: 'font-black text-[#8f1d1d]',
              description: 'font-semibold text-[#a94444]',
              closeButton: 'text-[#a94444] hover:bg-[#8f1d1d]/5',
              progressTrack: 'bg-[#f1b6b6]/60',
              progressIndicator: 'bg-[#d93838]',
            },
          }}
        />
        <AuthProvider>
          <App />
        </AuthProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,
)
