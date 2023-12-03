import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import Encryption from "@/utils/encryption";
import { sanitiseURL } from "@/utils/url";

type Site = {
    uri: string;
    user: string;
    password: string;
};

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

    return { loadSites, addSite, getSites };
});
