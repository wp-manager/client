import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Sites from "@/views/Sites.vue";
import Site from "@/views/Site.vue";
import SiteCore from "@/views/SiteCore.vue";
import AddSite from "@/views/AddSite.vue";
import { useSitesStore } from "@/stores/sites";

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
                    redirect: (to) => {
                      if(to.query.site_url && to.query.user_login && to.query.password){
                        const sitesStore = useSitesStore();
                        sitesStore.addSite(to.query.site_url as string, to.query.user_login as string, to.query.password as string)
                        return { path: '/sites', query: {} }
                      }
                      return { path: '/sites', query: {} }
                    }
                    
                },
            ]
        },
        {
            path: "/sites/:id",
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
