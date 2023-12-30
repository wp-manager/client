import { useApiStore } from "@/stores/api";
import { ref } from "vue";
let apiBase = import.meta.env.APP_SERVER_URI;

class Site {
    uri: string;

    icon = ref("");
    discovery = ref({});
    siteInfo = ref({});
    plugins = ref({});
    themes = ref({});

    responses = {};

    authOk = true;

    constructor(uri: string) {
        if (!uri) {
            throw new Error("Site URI is required");
        }

        this.uri = uri;
    }

    discover() {
        if (!this.discovery.value) {
            this.discovery.value = { loading: true };
            this.makeRequest("").then((res) => {
                this.discovery.value = res;
            });
        }
        return this.discovery.value;
    }

    getSiteInfo() {
        if (!this.siteInfo.value) {
            this.siteInfo.value = { loading: true };
            this.makeRequest("wp/v2/settings", true).then((res) => {
                this.siteInfo.value = res;
            });
        }
        return this.siteInfo.value;
    }

    getPlugins() {
        if (!this.plugins.value) {
            this.plugins.value = { loading: true };
            this.makeRequest("wp/v2/plugins").then((res) => {
                this.plugins.value = res;
            });
        }
        return this.plugins.value;
    }

    getThemes() {
        if (!this.themes.value) {
            this.themes.value = { loading: true };
            this.makeRequest("wp/v2/themes?context=embed").then((res) => {
                this.themes.value = res;
            });
        }
        return this.themes.value;
    }

    getFavicon(size: number = 32) {
        return `https://www.google.com/s2/favicons?domain=${this.uri}&sz=${size}`;
    }

    getWpManagerWpCore() {
        if (!this.responses.wpManagerWpCore) {
            this.responses.wpManagerWpCore = { loading: true };
            this.makeRequest("wp-manager/v1/wp-core").then((res) => {
                this.responses.wpManagerWpCore = res;
            });
        }
        return this.responses.wpManagerWpCore;
    }

    private async makeRequest(path: string, validateAuth: boolean = false) {
        return fetch(
            `https://${apiBase}/site/${this.uri}/wp-json/${path}`
        ).then((res) => {
            if (res.ok) {
                return res.json();
            }

            if(validateAuth){
                this.authOk = false;
            }

            return res.json();
        });
    }
}

export default Site;
