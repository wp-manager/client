import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";
import { useRoute, useRouter, type Router } from "vue-router";

type Site = {
    _id: string;
    uri: string;
};

export const useApiStore = defineStore("api", () => {
    const apiBase = import.meta.env.UI_API;
    let siteUri = ref("");
    let user = ref({});
    let sites: Ref<Site[]> = ref([] as Site[]);
    let rootData = ref({});

    let authCheck: (user: any) => void = () => {};

    
    getAuthdUser();
    getSites().then((resp) => (sites.value = resp));
    if(siteUri.value){
    root().then((resp) => (rootData.value = resp));
    }

    async function getAuthdUser() {
        user.value = await fetch(`https://${apiBase}/auth/user`).then((res) =>
            res.json()
        );
        authCheck(user.value);
    }

    async function getSites(): Promise<Site[]> {
        return fetch(`https://${apiBase}/sites`).then((res) => res.json());
    }

    async function root() {
        return fetch(`https://${apiBase}/site/${siteUri.value}/wp-json/`).then(
            (res) => res.json()
        );
    }

    async function getRoute(route: string) {
        return fetch(
            `https://${apiBase}/site/${siteUri.value}/wp-json/${route}`
        ).then((res) => res.json());
    }

    async function getWPEngineRoute(route: string) {
        return fetch(
            `https://${apiBase}/wpengine/${route}`
        ).then((res) => res.json());
    }

    function onAuth(callback: (user: any) => void) {
        authCheck = callback;
    }

    return { getSites, onAuth, user, sites, rootData, getRoute, siteUri, getWPEngineRoute };
});

export type { Site };
