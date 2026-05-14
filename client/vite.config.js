import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '^/(api/v1/auth|categorias|productos|pedidos)': {
        target: 'http://localhost:4002',
        changeOrigin: true,
      }
    }
  }
})
