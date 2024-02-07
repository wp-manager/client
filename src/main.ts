import "./assets/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useSharedStore } from "./stores/shared";
import { useSiteStore } from "./stores/site";

import App from "./App.vue";
import router from "./router";
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");

app.config.globalProperties.$sharedStore = useSharedStore();
app.config.globalProperties.$siteStore = useSiteStore();

// Plugins
import wpenginePlugin from "./plugins/wpengine";
app.use(wpenginePlugin);

// @ts-ignore
window.vue = app;

// Set theme to the user's preferred color scheme
function updateTheme() {
    const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    // @ts-ignore
    document.querySelector("html").setAttribute("data-bs-theme", colorMode);
}

// Set theme on load
updateTheme();

// Update theme when the preferred scheme changes
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", updateTheme);
