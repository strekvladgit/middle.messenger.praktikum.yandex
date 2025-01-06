// vite.config.ts
import Inspect from 'vite-plugin-inspect'
import {resolve} from 'path'
import handlebars from 'vite-plugin-handlebars'

export default {
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    rollupOptions: {
        input: {
            index: resolve(__dirname, './index.html'),
            register: resolve(__dirname, './pages/register/register.html'),
            login: resolve(__dirname, './pages/login/login.html'),
            404: resolve(__dirname, './pages/errors/page4xx/page4xx.html'),
            500: resolve(__dirname, './pages/errors/page5xx/page5xx.html'),
            profile: resolve(__dirname, './pages/profile/profile.html'),
            chat: resolve(__dirname, './pages/chat/chat.html'),
        },
    },
  },
  server: {
      port: 4000,
  },
  preview: {
      port: 3000
  },
  plugins: [
    Inspect()
  ]
}
