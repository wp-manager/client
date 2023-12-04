import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl';

let base = '/';
// if process.env.GITHUB_ACTION exists, set the base so it works on GitHub pages
if (process.env.GITHUB_ACTION) {
  console.log('We\'re in a GitHub Action! Changing base to /site-manager-ui/');
  base = '/site-manager-ui/';
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    basicSsl()
  ],
  base,
  envPrefix: 'UI_',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
