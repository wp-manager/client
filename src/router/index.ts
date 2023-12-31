// Vue
import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";
import Site from "@/classes/site.class";

// Stores
import { useAuthStore } from "@/stores/auth";
import { useSitesStore } from "@/stores/sites";

// Components
import AddSite from "@/views/AddSite.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import SiteComponents from "@/views/SiteComponents.vue";
import SiteCore from "@/views/SiteCore.vue";
import SiteDashboard from "@/views/SiteDashboard.vue";
import Sites from "@/views/Sites.vue";
import SitesPlugins from "@/views/SitesPlugins.vue";
import SiteVue from "@/views/Site.vue";
import SiteWPEngine from "@/views/SiteWPEngine.vue";
import WPEngine from "@/views/WPEngine.vue";

let historyMode = createWebHistory(import.meta.env.BASE_URL);
// Change the history mode to hash if we're in a GitHub Action
if (
    Object.keys(import.meta.env).includes("GITHUB_ACTION") &&
    import.meta.env.GITHUB_ACTION
) {
    historyMode = createWebHashHistory(import.meta.env.BASE_URL);
}

const router = createRouter({
    history: historyMode,
    linkExactActiveClass: "active",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/logout",
            name: "logout",
            component: () => {},
            beforeEnter: async () => {
                const authStore = useAuthStore();
                authStore.logout().then(() => {
                    window.location.href = "/";
                });
            },
        },
        {
            path: "/sites",
            name: "sites",
            component: Sites,
            children: [
                {
                    path: "plugins",
                    name: "sites-plugins",
                    component: SitesPlugins,
                },
            ],
        },
        {
            path: "/wpengine",
            name: "wpengine",
            component: WPEngine
        },
        {
            path: "/sites/add",
            name: "add-site",
            component: AddSite
        },
        {
            path: "/sites/:uri",
            name: "site",
            component: SiteVue,
            props: true,
            beforeEnter: (to) => {
                const sitesStore = useSitesStore();

                if(sitesStore.sites.find((s) => s.uri === to.params.uri)){
                    sitesStore.setSite(sitesStore.sites.find((s) => s.uri === to.params.uri) as any);
                    return;
                }

                const targetSite = new Site(to.params.uri as string);

                sitesStore.addSite(targetSite);
                sitesStore.setSite(targetSite);
            },
            children: [
                {
                    path: "",
                    name: "site-dashboard",
                    component: SiteDashboard,
                },
                {
                    path: "core",
                    name: "site-core",
                    component: SiteCore,
                },
                {
                    path: "components",
                    name: "site-components",
                    component: SiteComponents,
                },
                {
                    path: "plugins",
                    name: "site-plugins",
                    component: SitesPlugins,
                },
                {
                    path: "wpengine",
                    name: "site-wpengine",
                    component: SiteWPEngine,
                }
            ],
        },
    ],
});

export default router;
