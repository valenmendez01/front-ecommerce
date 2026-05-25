import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const proxyBackend = {
  target: 'http://localhost:4002',
  changeOrigin: true,
  bypass: (req) => {
    if (req.headers.accept?.includes('text/html')) {
      return '/index.html'
    }
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '^/(api/v1/auth|categorias|productos|pedidos|usuarios|ventas|selecciones)': proxyBackend,
    }
  }
})
