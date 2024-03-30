// Vue
import { createRouter, createWebHistory } from "vue-router";

let apiBase = import.meta.env.APP_SERVER_URL;

// Stores
import { useAccountStore } from "@/stores/account";
import { useToastStore } from "@/stores/toast";

// Components
import Account from "@/views/Account/Account.vue";
import AccountHome from "@/views/Account/AccountHome.vue";
import AccountPlugins from "@/views/Account/AccountPlugins.vue";
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
import SitePageSpeed from "@/views/SitePageSpeed.vue";
import SitesPlugins from "@/views/SitesPlugins.vue";
import SitesUsers from "@/views/SitesUsers.vue";
import SiteVue from "@/views/Site.vue";
import SiteSettings from "@/views/Site/Settings.vue";
import SiteCrawl from "@/views/SiteCrawl.vue";

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
                FetchUtils.abortFetches("User logged out");

                const accountStore = useAccountStore();
                await accountStore.logout();

                const toastStore = useToastStore();
                toastStore.removeAllToasts();
                toastStore.addToast({
                    message: "You have been logged out"
                });

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
            component: SitesApplicationPasswords,
        },
        {
            path: "/sites/add",
            name: "add-site",
            component: AddSite,
        },
        {
            path: "/site/:uri?",
            name: "site",
            component: SiteVue,
            redirect: { name: "site-dashboard" },
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
                {
                    path: "pagespeed",
                    name: "site-pagespeed",
                    component: SitePageSpeed,
                },
                {
                    path: "crawl",
                    name: "site-crawl",
                    component: SiteCrawl,
                },
                {
                    path: "settings",
                    name: "site-settings",
                    component: SiteSettings,
                    meta: {
                        siteSettings: true
                    },
                    redirect: { name: "site-settings-general" },
                    children: [{
                        path: "",
                        name: "site-settings-general",
                        component: SiteSettings,
                    }]
                },
            ],
        },
        {
            path: "/account",
            name: "account",
            redirect: { name: "account-home" },
            component: Account,
            meta: {
                account: true
            },
            children: [
                {
                    path: "",
                    name: "account-home",
                    component: AccountHome,
                },
                {
                    path: "plugins",
                    name: "account-plugins",
                    component: AccountPlugins
                },
                {
                    path: "cloudflare",
                    name: "account-cloudflare",
                    component: AccountPlugins
                }
            ],
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const accountStore = useAccountStore();
    await accountStore.getSession();

    if (to.name === "login" || to.name === "register") {
        // Redirect to homepage if we're already logged in
        if (accountStore.account) {
            return next({ name: "home" });
        }
    } else {
        // Redirect to login page if we're not logged in
        if (!accountStore.account) {
            return next({ name: "login" });
        }
    }

    next();
});

router.isReady().then(() => {
    const accountStore = useAccountStore();
    accountStore.loadPlugins();
});

export default router;