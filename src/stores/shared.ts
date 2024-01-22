import { defineStore } from "pinia";
import { useRoute, type RouteLocationRaw } from "vue-router";
import { useSiteStore } from "./site";
import router from "@/router";
import { reactive, ref, watch } from "vue";

export const useSharedStore = defineStore("shared", () => {
    const siteStore = useSiteStore();
    const sidebars = reactive({
        sidebars: {
            contextual: {
                main: {
                    items: <Object[] | RouteLocationRaw[]>[
                        { label: "Home", path: "/", icon: "bi-house" },
                        { divider: true },
                        {
                            label: "Add Site",
                            path: "/sites/add",
                            icon: "bi-window-plus",
                        },
                        {
                            label: "Sites",
                            path: "/sites",
                            icon: "bi-window-stack",
                        },
                        { divider: "Core" },
                        {
                            label: "Plugins",
                            path: "/sites/plugins",
                            icon: "bi-plug",
                        },
                        {
                            label: "Users",
                            path: "/sites/users",
                            icon: "bi-people",
                        },
                        {
                            label: "Application Passwords",
                            path: "/sites/application-passwords",
                            icon: "bi-key",
                        },
                        { divider: "Additional" },
                        {
                            label: "Gravity Forms",
                            path: "/sites/gravity-forms",
                            icon: "bi-ui-checks",
                        },
                        {
                            label: "Contact Form 7",
                            path: "/sites/cf7-forms",
                            icon: "bi-ui-checks",
                        },
                    ],
                },
                site: {
                    items: <Object[] | RouteLocationRaw[]>[
                        { label: "Back", path: "/", icon: "bi-arrow-left" },
                        { divider: "Overview" },
                        {
                            name: "site-dashboard",
                            label: "Dashboard",
                            params: { uri: siteStore.routeSite()?.url },
                            icon: "bi-grid",
                        },
                        { divider: "Site Features" },
                        {
                            label: "Users",
                            path: "site-plugins",
                            icon: "bi-plug",
                        },
                        {
                            label: "Plugins",
                            path: "site-plugins",
                            icon: "bi-plug",
                        },
                        { divider: "Additional" },
                        {
                            label: "PageSpeed",
                            name: "site-pagespeed",
                            params: { uri: siteStore.routeSite()?.url },
                            icon: "bi-google",
                        },
                    ],
                },
                settings: {
                    items: <Object[] | RouteLocationRaw[]>[
                        { name: "Home", path: "/", icon: "bi-house" },
                        { name: "About", path: "/about", icon: "bi-person" },
                        {
                            name: "Contact",
                            path: "/contact",
                            icon: "bi-envelope",
                        },
                    ],
                },
            },
            footer: {
                items: <Object[] | RouteLocationRaw[]>[
                    { name: "Home", path: "/", icon: "bi-house" },
                    { name: "About", path: "/about", icon: "bi-person" },
                    { name: "Contact", path: "/contact", icon: "bi-envelope" },
                ],
            },
        },
    });

    // watch for route param changes
    watch(
        () => router.currentRoute.value.params,
        () => {
            const site = siteStore.routeSite();
            if (!site) return;

            sidebars.sidebars.contextual.site.items.forEach((item: any) => {
                item.params = { uri: site.url };
            });
        }
    );

    return sidebars;
});
