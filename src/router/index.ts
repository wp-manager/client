// Vue
import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";
import {Site} from "@/classes/site.class";

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
import FetchUtils from "@/utils/fetch";
import SitesUsers from "@/views/SitesUsers.vue";
import { useSiteStore } from "@/stores/site";
import WPSite from "@/classes/wp.class";
import { useAccountStore } from "@/stores/account";
import SitesGravityForms from "@/views/SitesGravityForms.vue";
import SitesCF7Forms from "@/views/SitesCF7Forms.vue";

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
            beforeEnter: () => {
                // Abort any pending requests
                FetchUtils.abortFetches('User logged out');

                const authStore = useAuthStore();
                authStore.logout().then(() => {
                    router.push({ name: "login" });
                });
            },
        },
        {
            path: "/sites",
            name: "sites",
            component: Sites,
        },
        {
            path: "/sites/plugins",
            name: "sites-plugins",
            component: SitesPlugins,
        },
        {
            path: "/sites/gravity-forms",
            name: "sites-gravity-forms",
            component: SitesGravityForms,
        },
        {
            path: "/sites/cf7-forms",
            name: "sites-cf7-forms",
            component: SitesCF7Forms,
        },
        {
            path: "/sites/users",
            name: "sites-users",
            component: SitesUsers,
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
            meta: {
                site: null
            },
            beforeEnter: async (to) => {
                if(to.params.uri){
                    const accountStore = useAccountStore();
                    await accountStore.getSession();
                    const siteStore = useSiteStore();
                    let foundSite = siteStore.sites.find(site => site.url === to.params.uri);
                    if(!foundSite){
                        return router.push({ name: "sites" });
                    }
                    to.meta.site = foundSite;
                }
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
