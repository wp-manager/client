import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import Site from "@/classes/site.class";

type TypeSite = {
    _id: string;
    uri: string;
};

export const useApiStore = defineStore("api", () => {
    const apiBase = import.meta.env.APP_SERVER_URI;
    let siteUri = ref("");
    let wpengineInstallId = ref("");
    let user = ref({});
    let sites = ref<Site[]>([] as Site[]);
    let rootData = ref({});

    let authCheck: (user: any) => void = () => {};

    getAuthdUser();
    getSites().then((resp) => {
        sites.value = resp as any;
    });

    if (siteUri.value) {
        root().then((resp) => (rootData.value = resp));
    }

    async function getAuthdUser() {
        user.value = await fetch(`https://${apiBase}/auth/user`, {credentials: 'include'}).then((res) =>
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
        return fetch(`https://${apiBase}/wpengine/${route}`, {credentials: 'include'}).then(
            (res) => res.json()
        );
    }

    async function postWPEngineRoute(route: string, data: any) {
        return fetch(`https://${apiBase}/wpengine/${route}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }).then(async (response) => {
            return response.text().then(function (text) {
                return text ? JSON.parse(text) : {};
            });
        });
    }

    function onAuth(callback: (user: any) => void) {
        authCheck = callback;
    }

    return {
        getSites,
        onAuth,
        user,
        sites,
        rootData,
        getRoute,
        siteUri,
        getWPEngineRoute,
        postWPEngineRoute,
        wpengineInstallId,
    };
});

export type { Site };
