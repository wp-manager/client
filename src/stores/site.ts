import { ref } from "vue";
import { defineStore } from "pinia";

import type { Site } from "@/types/site";
import { useAuthStore } from "./auth";
import Encryption from "@/utils/encryption";

export const useSiteStore = defineStore("site", () => {
    let site = ref<Site>({
        uri: "",
        user: "",
        password: "",
    });

    function useSite(site: Site) {

        site = site;
    }

    function getAuthHeader(): string {
        const authStore = useAuthStore();
        const encryption = new Encryption();
        console.log(site.value);
        console.log('deserialisedPassword', site.value.password);
        const deserialisedPassword = encryption.deserialise(
            atob(site.value.password)
        );
        const decryptedPassword = encryption.decrypt(
            deserialisedPassword,
            authStore.get()
        );

        return `Basic ${btoa(`${site.value.user}:${decryptedPassword}`)}`;
    }

    // API
    async function apiRequest(
        url: URL,
        method: "GET" | "POST" | "PUT" | "DELETE",
        params: URLSearchParams,
        body: any
    ) {
        const headers = new Headers();
        headers.append("Authorization", getAuthHeader());
        const options = {
            method: method,
            headers: headers,
            body: body,
        };
        const response = await fetch(url.toString(), options);
        return response.json();
    }

    async function apiGetCore() {
        const url = new URL(`https://${site.value.uri}/wp-json/wp/v2`);
        const params = new URLSearchParams();
        return await apiRequest(url, "GET", params, null);
    }

    return { useSite, apiGetCore };
});
