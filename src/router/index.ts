import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Sites from "@/views/Sites.vue";
import Site from "@/views/Site.vue";
import SiteCore from "@/views/SiteCore.vue";
import AddSite from "@/views/AddSite.vue";
import { useSitesStore } from "@/stores/sites";
import Encryption from "@/utils/encryption";
import { useAuthStore } from "@/stores/auth";
import { useSiteStore } from "@/stores/site";
import { useFlashStore } from "@/stores/flash";

let historyMode = createWebHistory(import.meta.env.BASE_URL);
// Change the history mode to hash if we're in a GitHub Action
if (Object.keys(import.meta.env).includes("GITHUB_ACTION") && import.meta.env.GITHUB_ACTION) {
    historyMode = createWebHashHistory(import.meta.env.BASE_URL);
}

const router = createRouter({    
    history: historyMode,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/sites",
            name: "sites",
            component: Sites,
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

                        const authStore = useAuthStore();
                        // Encrypt the password
                        const encryption = new Encryption();
                        const encryptedPassword = await encryption.encrypt(
                            to.query.password as string,
                            authStore.get()
                        );

                        const serializedEncryptedPassword =
                            encryption.serialise(encryptedPassword);

                        const sitesStore = useSitesStore();

                        sitesStore.addSite(
                            to.query.site_url as string,
                            to.query.user_login as string,
                            btoa(serializedEncryptedPassword)
                        );

                        return { path: "/sites", query: {} };
                    },
                },
            ],
        },
        {
            path: "/sites/:uri",
            name: "site",
            component: Site,
            props: true,
            beforeEnter: (to) => {
                const sitesStore = useSitesStore();
                const site = sitesStore.getSite(to.params.uri as string);

                if (!site) {
                    const flashStore = useFlashStore();
                    flashStore.addFlash({
                        type: "error",
                        message: "Site not found",
                    });
                    return {
                        path: "/sites",
                        query: {
                            flash: null,
                        },
                    };
                }

                const siteStore = useSiteStore();
                siteStore.useSite(site);
            },
            children: [
                {
                    path: "core",
                    name: "site-core",
                    component: SiteCore,
                },
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

    if(to.params.uri) {
    const sitesStore = useSitesStore();
    const site = sitesStore.getSite(to.params.uri as string);

    if (site) {
        const siteStore = useSiteStore();
        siteStore.useSite(site);
    }
}
    
});

export default router;