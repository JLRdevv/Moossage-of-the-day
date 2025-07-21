import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const port = parseInt(process.env.VITE_PORT) || 5173
  const allowedHostsEnv = process.env.VITE_ALLOWED_HOSTS || 'all'
  const allowedHosts = allowedHostsEnv === 'all'
    ? 'all'
    : allowedHostsEnv.split(',').map(host => host.trim())

  return {
    plugins: [react()],
    server: {
      host: true,
      port,
      allowedHosts
    }
  }
})
