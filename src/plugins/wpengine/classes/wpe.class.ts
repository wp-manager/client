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
            `${apiBase}/plugins/wp-engine-api-proxy/${path}`,
            {
                credentials: "include",
                signal: FetchUtils.abortController.signal,
                method,
                body: body ? JSON.stringify(body) : null,
            }
        ));
    }

    getUser() {
        return this.makeRequest("api/user");
    }

    getAccounts(account_id: string = '') {
        if(!account_id) return this.makeRequest('api/accounts');
        return this.makeRequest(`api/accounts/${account_id}`);
    }

    getSites(site_id: string = '') {
        if(!site_id) return this.makeRequest('api/sites');
        return this.makeRequest(`api/sites/${site_id}`);
    }

    getInstalls(install_id: string = '') {
        if(!install_id) return this.makeRequest('api/installs');
        return this.makeRequest(`api/installs/${install_id}`);
    }

    

}

export default WPEngine;
