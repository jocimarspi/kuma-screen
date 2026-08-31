import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Dev only: contorna CORS. O alvo real vem do query param `target`
// (URL do backend configurada em /settings), não é fixo no .env.
function kumaDevProxy(): Plugin {
  return {
    name: 'kuma-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/uptime', async (req, res) => {
        const reqUrl = new URL(req.url || '', 'http://localhost')
        const target = reqUrl.searchParams.get('target')

        if (!target) {
          res.statusCode = 400
          res.end('missing target query param')
          return
        }

        const upstreamUrl = target.replace(/\/+$/, '') + reqUrl.pathname

        try {
          const upstream = await fetch(upstreamUrl, {
            method: req.method,
            headers: req.headers.authorization
              ? { authorization: req.headers.authorization }
              : undefined
          })

          res.statusCode = upstream.status
          upstream.headers.forEach((value, key) => {
            if (key.toLowerCase() !== 'content-encoding') res.setHeader(key, value)
          })
          res.end(Buffer.from(await upstream.arrayBuffer()))
        } catch (error) {
          res.statusCode = 502
          res.end('proxy error: ' + (error as Error).message)
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), kumaDevProxy()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
