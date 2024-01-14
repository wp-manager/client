import WPSite from "@/classes/wp.class";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSiteStore = defineStore("site", () => {
    const sites = reactive<WPSite[]>([]);

    function addSite(uri: string): WPSite{
        const foundSite = sites.find(site => site.url === uri);
        if(foundSite){
            console.log('Existing site', uri)
            return foundSite;
        }
        console.log('New site', uri)
        
        const newSite = new WPSite(uri);
        sites.push(newSite);
        return newSite;
    }

    return { sites, addSite }
});
