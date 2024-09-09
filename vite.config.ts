import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // Quando uma requisição para /api for feita, será redirecionada para http://localhost:3001
      '/uptime': {
        target: 'http://localhost:3001', // URL do backend
        changeOrigin: true,               // Muda a origem para a origem do backend
        rewrite: (path) => path.replace(/^\/uptime/, ''), // Remove '/api' do caminho
      },
    },
  },
})
 