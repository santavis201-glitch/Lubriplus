import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto permite que se vea en la red local
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        secure: false,
        ws: true,
        // Agregamos esto para forzar que la ruta sea exacta
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})