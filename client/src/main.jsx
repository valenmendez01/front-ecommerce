import { createRoot } from 'react-dom/client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
          <App />
        </HeroUIProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
