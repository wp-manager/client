import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";
import Home from "@/views/Home.vue";
import Sites from "@/views/Sites.vue";
import SiteVue from "@/views/Site.vue";
import SiteCore from "@/views/SiteCore.vue";
import AddSite from "@/views/AddSite.vue";
import { useSitesStore } from "@/stores/sites";
import { useSiteStore } from "@/stores/site";
import Login from "@/views/Login.vue";
import SiteComponents from "@/views/SiteComponents.vue";
import SiteDashboard from "@/views/SiteDashboard.vue";
import SitesPlugins from "@/views/SitesPlugins.vue";
import WPEngine from "@/views/WPEngine.vue";
import SiteWPEngine from "@/views/SiteWPEngine.vue";
import { useNewSitesStore } from "@/stores/sitesNew";
import Site from "@/classes/site.class";

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
            component: AddSite,
            children: [
                {
                    path: "callback",
                    name: "add-site-callback",
                    component: () => {},
                    beforeEnter: async (to) => {
                        const params = new URLSearchParams(
                            to.query as Record<string, string>
                        );

                        if (
                            !params.has("site_url") ||
                            !params.has("user_login") ||
                            !params.has("password")
                        ) {
                            return { path: "/sites", query: {} };
                        }

                        if (
                            params.get("site_url") == "" ||
                            params.get("user_login") == "" ||
                            params.get("password") == ""
                        ) {
                            return { path: "/sites", query: {} };
                        }

                        return { path: "/sites", query: {} };
                    },
                },
            ],
        },
        {
            path: "/sites/:uri",
            name: "site",
            component: SiteVue,
            props: true,
            beforeEnter: (to) => {
                const newSitesStore = useNewSitesStore();

                if(newSitesStore.sites.find((s) => s.uri === to.params.uri)){
                    newSitesStore.setSite(newSitesStore.sites.find((s) => s.uri === to.params.uri) as Site);
                    return;
                }

                const targetSite = new Site(to.params.uri as string);
                newSitesStore.addSite(targetSite);
                newSitesStore.setSite(targetSite);
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
                    path: "site-wpengine",
                    name: "site-wpengine",
                    component: SiteWPEngine,
                }
            ],
        },
    ],
});

router.afterEach((to, from) => {
    // remove ?flash if it exists
    const params = new URLSearchParams(window.location.search);
    if (params.has("flash")) {
        params.delete("flash");
        if (params.size > 0) {
            window.history.replaceState(
                {},
                "",
                `${to.path}?${params.toString()}`
            );
        } else {
            window.history.replaceState({}, "", window.location.pathname);
        }
    }

    if (to.params.uri) {
        const sitesStore = useSitesStore();
        const site = sitesStore.getSite(to.params.uri as string);

        if (site) {
            const siteStore = useSiteStore();
            siteStore.useSite(site);
        }
    }
});

export default router;
