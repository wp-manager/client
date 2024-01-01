import { defineStore } from "pinia";
import { ref } from "vue";
import {Site} from "@/classes/site.class";

type TypeSite = {
    _id: string;
    uri: string;
};

export const useApiStore = defineStore("api", () => {
    const apiBase = import.meta.env.APP_SERVER_URL;
    let siteUri = ref("");
    let wpengineInstallId = ref("");
    let user = ref({});
    let sites = ref<Site[]>([] as Site[]);
    let rootData = ref({});

    async function getSites(): Promise<Site[]> {
        return fetch(`${apiBase}/sites`).then((res) => res.json());
    }

    async function getRoute(route: string) {
        return fetch(
            `${apiBase}/site/${siteUri.value}/wp-json/${route}`
        ).then((res) => res.json());
    }

    async function getWPEngineRoute(route: string) {
        return fetch(`${apiBase}/wpengine/${route}`, {credentials: 'include'}).then(
            (res) => res.json()
        );
    }

    async function postWPEngineRoute(route: string, data: any) {
        return fetch(`${apiBase}/wpengine/${route}`, {
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

    return {
        getSites,
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
