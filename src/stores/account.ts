
import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";
import { useSiteStore } from "./site";
import WPSite from "@/classes/wp.class";

let apiBase = import.meta.env.APP_SERVER_URL;

type AccountState = {
    account: any;
};

let loading = false;

export const useAccountStore = defineStore("accountStore", {
    state: (): AccountState => ({
        account: null,
    }),
    actions: {
        async getSession(){
            const { data } = await useFetch(`${apiBase}/account`, {credentials: "include"}).json();
            this.account = data.value
            const siteStore = useSiteStore()
            this.account.sites.forEach((site: string) => {
                siteStore.addSite(site)
            })

        }
    }
});