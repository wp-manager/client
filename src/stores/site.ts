import WPSite from "@/classes/wp.class";
import router from "@/router";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSiteStore = defineStore("site", () => {
    const sites = reactive<WPSite[]>([]);

    function addSite(uri: string): WPSite{
        const foundSite = sites.find(site => site.url === uri);

        if(foundSite){
            return foundSite;
        }
        
        const newSite = new WPSite(uri);
        sites.push(newSite);

        return newSite;
    }

    function hasSite(uri: string): boolean{
        return sites.find(site => site.url === uri) !== undefined;
    }

    function routeSite(){
        let uri = router.currentRoute.value.params.uri;
        
        if(!uri || !hasSite(uri.toString())){
            return;
        }

        return sites.find(site => site.url === uri);
    }

    return { sites, addSite, hasSite, routeSite };
});
