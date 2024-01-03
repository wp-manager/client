import { SiteConnectionStatus } from "@/types/site";
import FetchUtils from "@/utils/fetch";
import { reactive, ref, type Ref } from "vue";
let apiBase = import.meta.env.APP_SERVER_URL;

class Site {
    uri: string;

    // reactive
    connectionStatus: SiteConnectionStatus = SiteConnectionStatus.UNKNOWN;

    icon = ref("");
    discovery = null;
    siteInfo = ref({});
    plugins = ref({});
    themes = ref({});

    responses = {} as any;

    error: boolean | string = false;

    constructor(uri: string) {
        if (!uri) {
            throw new Error("Site URI is required");
        }

        this.uri = uri;

        this.discover();
    }
    
    getSiteAvailability() {
        return this.connectionStatus;
        if (this.connectionStatus !== SiteConnectionStatus.UNKNOWN) {
            return this.connectionStatus;
        }

        this.connectionStatus = SiteConnectionStatus.CHECKING;
        this.discover();
        return this.connectionStatus;
    }

    async discover() {
        return await this.request("");
    }

    getSiteInfo() {
        return {};
        if (!this.siteInfo.value) {
            this.siteInfo.value = { loading: true };
            this.request("wp/v2/settings", true).then((res) => {
                this.connectionStatus = SiteConnectionStatus.AVAILABLE;
                this.siteInfo.value = res;
            }).catch((err) => {
                if (err.status === 401) {
                    this.connectionStatus = SiteConnectionStatus.UNAUTHORIZED;
                } else if(err.status === 502) {
                    this.connectionStatus = SiteConnectionStatus.OFFLINE;
                } else {
                    this.connectionStatus = SiteConnectionStatus.ERROR;
                }
            });
        }
        return this.siteInfo.value;
    }

    getPlugins() {
        if (!this.plugins.value) {
            this.plugins.value = { loading: true };
            this.request("wp/v2/plugins").then((res) => {
                this.plugins.value = res;
            });
        }
        return this.plugins.value;
    }

    getThemes() {
        if (!this.themes.value) {
            this.themes.value = { loading: true };
            this.request("wp/v2/themes?context=embed").then((res) => {
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
            this.request("wp-manager/v1/wp-core").then((res) => {
                this.responses.wpManagerWpCore = res;
            });
        }
        return this.responses.wpManagerWpCore;
    }

    private async request(path: string) {
        this.queueRequest(path);
        return;
        return fetch(`${apiBase}/site/${this.uri}/wp-json/${path}`, { credentials: "include" }).then((res) => res.json());
    }

    private queueRequest(path: string) {
        FetchUtils.queueRequest(`${apiBase}/site/${this.uri}/wp-json/${path}`, { credentials: "include" });
    }
}

export {
    Site,
    SiteConnectionStatus
}

setTimeout(() => {
    FetchUtils.processQueue().then((res) => {
        console.log(res);
    });
},2000);