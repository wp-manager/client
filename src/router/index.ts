import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Sites from "@/views/Sites.vue";
import Site from "@/views/Site.vue";
import SiteCore from "@/views/SiteCore.vue";
import AddSite from "@/views/AddSite.vue";
import { useSitesStore } from "@/stores/sites";
import Encryption from "@/utils/encryption";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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

export default router;
