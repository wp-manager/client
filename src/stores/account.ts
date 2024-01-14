
import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";
import { useSiteStore } from "./site";
import WPSite from "@/classes/wp.class";


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
            const { data } = await useFetch("https://localhost:8443/account", {credentials: "include"}).json();
            this.account = data.value
            const siteStore = useSiteStore()
            this.account.sites.forEach((site: string) => {
                siteStore.addSite(site)
            })

        }
    }
});