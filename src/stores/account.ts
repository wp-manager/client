import { useFetch, type UseFetchReturn } from "@vueuse/core";
import { defineStore } from "pinia";
import { useSiteStore } from "./site";

let apiBase = import.meta.env.APP_SERVER_URL;

type AccountState = {
    pending: boolean;
    account: any;
    pluginsLoaded?: boolean;
};

export const useAccountStore = defineStore("accountStore", {
    state: (): AccountState => ({
        pending: false,
        account: null,
        pluginsLoaded: false,
    }),
    actions: {
        async getSession(force = false) {
            if (this.pending && !force) return;
            this.pending = true;

            const { data } = await useFetch(`${apiBase}/account`, {
                credentials: "include",
            }).json();

            this.account = data.value;

            if (!this.account) return;
            if (!this.account.sites) return;

            const siteStore = useSiteStore();
            this.account.sites.forEach((site: string) => {
                siteStore.addSite(site);
            });
        },
        loadPlugins() {
            if (!this.account || !this.account.plugins || this.pluginsLoaded) return;

            this.account.plugins.forEach((plugin: any) => {
                // create script module using plugin as src
                const script = document.createElement("script");
                script.type = "module";
                // if script is using localhost, don't use the apiBase
                if (plugin.includes("localhost")) {
                    script.src = plugin;
                } else {
                    script.src = `${apiBase}/account/plugin/${encodeURIComponent(
                        plugin
                    )}`;
                }
                document.body.appendChild(script);
            });
        },
        async logout() {
            await useFetch(`${apiBase}/account/logout`, {
                method: "POST",
                credentials: "include",
            });
            this.account = null;
        },
    },
});
