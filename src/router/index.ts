// Vue
import {
    createRouter,
    createWebHistory,
} from "vue-router";

// Stores
import { useSiteStore } from "@/stores/site";
import { useAccountStore } from "@/stores/account";

// Components
import AddSite from "@/views/AddSite.vue";
import FetchUtils from "@/utils/fetch";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import SiteCore from "@/views/SiteCore.vue";
import SiteDashboard from "@/views/SiteDashboard.vue";
import Sites from "@/views/Sites.vue";
import SitesApplicationPasswords from "@/views/SitesApplicationPasswords.vue";
import SitesCF7Forms from "@/views/SitesCF7Forms.vue";
import SitesGravityForms from "@/views/SitesGravityForms.vue";
import SitesPlugins from "@/views/SitesPlugins.vue";
import SitesUsers from "@/views/SitesUsers.vue";
import SiteVue from "@/views/Site.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
            path: "/register",
            name: "register",
            component: Register,
        },
        {
            path: "/logout",
            name: "logout",
            component: () => {},
            beforeEnter: async () => {
                // Abort any pending requests
                FetchUtils.abortFetches('User logged out');

                const accountStore = useAccountStore();
                await accountStore.logout();
                router.push({ name: "login" });

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
            path: "/sites/application-passwords",
            name: "sites-application-passwords",
            component: SitesApplicationPasswords
        },
        {
            path: "/sites/add",
            name: "add-site",
            component: AddSite
        },
        {
            path: "/site/:uri",
            name: "site",
            component: SiteVue,
            meta: {
                site: null
            },
            beforeEnter: async (to) => {
                if(to.params.uri){
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
                    path: "plugins",
                    name: "site-plugins",
                    component: SitesPlugins,
                },
            ],
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const accountStore = useAccountStore();
    await accountStore.getSession();

    if(to.name === "login" || to.name === "register"){
        // Redirect to homepage if we're already logged in
        if(accountStore.account){
            return next({ name: "home" });
        }
    }else{
        // Redirect to login page if we're not logged in
        if(!accountStore.account){
            return next({ name: "login" });
        }
    }

    next();
});
export default router;
