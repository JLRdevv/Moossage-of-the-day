import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const allowedHosts = env.VITE_ALLOWED_HOSTS.split(',')

  return {
    plugins: [react()],
    server: {
      host: true,
      port: parseInt(env.VITE_PORT) || 5173,
      allowedHosts
    }
  }
})