import WPSite from "@/classes/wp.class";
import router from "@/router";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useSiteStore = defineStore("site", () => {
    const sites = reactive<WPSite[]>([]);

    const sortedSites = computed(() => {
        return sites.sort((a, b) => {
            // sanitized urls
            const aUrl = a.url.replace('https://', '').replace('http://', '').replace('www.', '');
            const bUrl = b.url.replace('https://', '').replace('http://', '').replace('www.', '');
            // use url unless discover data is available
            const aName = a.discover()?.data?.name || aUrl;
            const bName = b.discover()?.data?.name || bUrl;

            return aName.localeCompare(bName);
        });
    });

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

    return { sites, addSite, hasSite, routeSite, sortedSites};
});
