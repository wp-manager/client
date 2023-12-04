import { ref } from "vue";
import { defineStore } from "pinia";

import { sanitiseURL } from "@/utils/url";
import type { Site } from "@/types/site";

export const useSitesStore = defineStore("sites", () => {
    let sites = ref<Site[]>([]);

    loadSites();

    function loadSites() {
        if (localStorage.getItem("sites")) {
            sites.value = [];

            let sitesJSON = localStorage.getItem("sites") as string;
            let unparsedSites = JSON.parse(sitesJSON) as Site[];

            unparsedSites.forEach((site) => {
                sites.value.push({
                    uri: sanitiseURL(site.uri),
                    user: site.user,
                    password: site.password,
                });
            });
        }
    }

    function addSite(
        uri: Site["uri"],
        user: Site["user"],
        password: Site["password"]
    ) {
        let existingSite = sites.value.find((site) => site.uri === uri);

        if (existingSite) {
          console.log('existingSite', existingSite);
            existingSite.user = user;
            existingSite.password = password;
        } else {
            sites.value.push({
                uri: uri,
                user: user,
                password: password,
            });
        }

        saveSites();
    }

    function saveSites() {
        let encryptedSites: Site[] = [];

        sites.value.forEach((site) => {
            encryptedSites.push({
                uri: site.uri,
                user: site.user,
                password: site.password
            });
        });

        let sitesJSON = JSON.stringify(encryptedSites);
        localStorage.setItem("sites", sitesJSON);
    }

    function getSites(): Site[] {
        return sites.value;
    }

    function getSite(uri: Site["uri"]): Site | undefined {
        return sites.value.find((site) => site.uri === uri);
    }

    return { loadSites, addSite, getSites, getSite };
});
