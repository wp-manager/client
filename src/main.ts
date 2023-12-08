import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()

// Plugins
import { usePluginsStore } from './stores/plugins'
const pluginsStore = usePluginsStore()

await pluginsStore.load('wp-engine');
function toggleDSAP(){
    pluginsStore.toggle(pluginsStore.plugins[0]);
}