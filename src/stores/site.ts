import { ref } from "vue";
import { defineStore } from "pinia"

import type { Site } from "@/types/site";
import { useAuthStore } from "./auth";
import Encryption from "@/utils/encryption";

export const useSiteStore = defineStore("site", () => {
    let siteInstance = ref<Site>({
        uri: "",
        user: "",
        password: "",
    });

    function useSite(site: Site) {
        siteInstance.value = site;
    }

    async function getAuthHeader(): Promise<string> {
        const authStore = useAuthStore();
        const encryption = new Encryption();
        const deserialisedPassword = encryption.deserialise(
            atob(siteInstance.value.password)
        );
        const decryptedPassword = await encryption.decrypt(
            deserialisedPassword,
            authStore.get()
        ).catch((error) => {
            throw new Error(error);
        });

        return `Basic ${btoa(`${siteInstance.value.user}:${decryptedPassword}`)}`;
    }

    // API
    async function apiRequest(
        url: URL,
        method: "GET" | "POST" | "PUT" | "DELETE",
        params: URLSearchParams,
        body: any
    ) {
        const options = {
            method: method,
            headers: {
                Authorization: await getAuthHeader(),
                "Access-Control-Max-Age": "86400"
            },
            body: body,
        };
        console.log(options);
        const response = await fetch(url.toString(), options);
        return response.json();
    }

    async function getSiteSettings() {
        const url = new URL(`https://${siteInstance.value.uri}/wp-json/wp/v2/settings`);
        const params = new URLSearchParams();
        return await apiRequest(url, "GET", params, null);
    }

    return { siteInstance, useSite, getSiteSettings };
});
