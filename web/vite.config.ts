import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/patient": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/appointments": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/psychologist": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    },
  },
})
