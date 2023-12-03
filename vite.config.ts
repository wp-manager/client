import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    basicSsl()
  ],
  server: {
    https: true
  },
  envPrefix: 'UI_',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
