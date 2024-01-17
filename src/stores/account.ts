
import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";
import { useSiteStore } from "./site";
import WPSite from "@/classes/wp.class";

let apiBase = import.meta.env.APP_SERVER_URL;

type AccountState = {
    pending: boolean;
    account: any;
};


export const useAccountStore = defineStore("accountStore", {
    state: (): AccountState => ({
        pending: false,
        account: null,
    }),
    actions: {
        async getSession(force = false){
            if(this.pending && !force) return;
            this.pending = true;

            const { data } = await useFetch(`${apiBase}/account`, {credentials: "include"}).json();

            this.account = data.value;

            if(!this.account) return;
            if(!this.account.sites) return;

            const siteStore = useSiteStore();
            this.account.sites.forEach((site: string) => {
                siteStore.addSite(site)
            })

        },
        async logout(){
            await useFetch(`${apiBase}/account/logout`, {method: 'POST', credentials: "include"});
            this.account = null;
        }
    }
});