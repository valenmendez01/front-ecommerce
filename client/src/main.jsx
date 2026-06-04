import { createRoot } from 'react-dom/client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
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
          }}
        />
        <AuthProvider>
          <App />
        </AuthProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </Provider>
);
