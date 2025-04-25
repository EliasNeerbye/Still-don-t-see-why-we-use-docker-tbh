import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0',
    strictPort: true,
    port: 5173,
    allowedHosts: [
      'localhost',
      'docker.caracal.ikt-fag.no',
      '.caracal.ikt-fag.no'  // This will match any subdomain of caracal.ikt-fag.no
    ]
  }
})