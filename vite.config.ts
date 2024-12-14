import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '.dist/',
  },
  resolve: {
    alias: [
      { find: './runtimeConfig', replacement: './runtimeConfig.browser' },
      { find: '@', replacement: '/src' },
    ],
  },
  plugins: [react()],
  server: {
    proxy: {
      '/core': {
        // 動いているんだけど、サーバーがIPv6に対応していないっぽい。（curl www.google.comは帰ってくるので）
        target: 'https://vocalendar.jp/',
        changeOrigin: true,
      },
    },
  },
})
