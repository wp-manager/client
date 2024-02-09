import { useFetch } from "@/composables/fetch";
import FetchUtils from "@/utils/fetch";
import { reactive } from "vue";

let apiBase = import.meta.env.APP_SERVER_URL;

class WPEngine {
    data: any = reactive({});

    constructor() {
    }

    makeRequest(path: string, method: string = "GET", body: any = null) {
        if (this.data[path]) return this.data[path];
        return (this.data[path] = useFetch(
            `${apiBase}/plugins/wp-engine-api-proxy/api/${path}`,
            {
                credentials: "include",
                signal: FetchUtils.abortController.signal,
                method,
                body: body ? JSON.stringify(body) : null,
            }
        ));
    }

    getUser() {
        return this.makeRequest("user");
    }

    getAccounts(account_id: string = '') {
        if(!account_id) return this.makeRequest('accounts');
        return this.makeRequest(`accounts/${account_id}`);
    }

    getSites(site_id: string = '') {
        if(!site_id) return this.makeRequest('sites');
        return this.makeRequest(`sites/${site_id}`);
    }

    getInstalls(install_id: string = '') {
        if(!install_id) return this.makeRequest('installs');
        return this.makeRequest(`installs/${install_id}`);
    }

    

}

export default WPEngine;
