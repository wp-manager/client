import { useFetch } from "@/composables/fetch";
import FetchUtils from "@/utils/fetch";
import { reactive } from "vue";

let apiBase = import.meta.env.APP_SERVER_URL;

class WPSite {
    url: string;
    data: any = reactive({});

    favicon = "";
    screenshot = "";
    mobileScreenshot = "";

    constructor(url: string) {
        this.url = url;
        this.favicon = `https://${url}/favicon.ico`;
        this.screenshot = `${apiBase}/site/${this.url}/screenshot`;
        this.mobileScreenshot = `${apiBase}/site/${this.url}/screenshot/mobile`;
    }

    // @
    makeRequest(path: string) {
        if (this.data[path]) return this.data[path];
        return (this.data[path] = useFetch(
            `${apiBase}/site/${this.url}/${path}`,
            { credentials: "include", signal: FetchUtils.abortController.signal }
        ));
    }

    hasNamespace(namespace: string) {
        if (!this.data["wp-json/"]) return false;
        if (!this.data["wp-json/"].data) return false;
        if (!this.data["wp-json/"].data.namespaces) return false;
        return this.data["wp-json/"].data.namespaces.includes(namespace);
    }

    hasPlugin(pluginName: string){
        if (!this.data["wp-json/wp/v2/plugins"]) return false;
        if (!this.data["wp-json/wp/v2/plugins"].data) return false;
        return this.data["wp-json/wp/v2/plugins"].data.some((plugin: any) => plugin.plugin === pluginName);
    }

    discover() {
        return this.makeRequest("wp-json/");
    }

    plugins() {
        return this.makeRequest("wp-json/wp/v2/plugins");
    }

    users(roles: string = '') {
        return this.makeRequest(`wp-json/wp/v2/users?context=edit&roles=${roles}`);
    }

    userApplicationPasswords(userId: string) {
        return this.makeRequest(`wp-json/wp/v2/users/${userId}/application-passwords`);
    }

    themes() {
        return this.makeRequest("wp-json/wp/v2/themes");
    }

    // WP Manager Companion
    wpm_core_version() {
        return this.makeRequest("wp-json/wp-manager/v1/wp-core");
    }

    // StrategiQ Dev Toolkit
    stq_gravity_forms() {
        return this.makeRequest("wp-json/stq/v1/gravity-forms");
    }
    stq_cf7_forms() {
        return this.makeRequest("wp-json/stq/v1/cf7-forms");
    }
    stq_wp_core() {
        return this.makeRequest("wp-json/stq/v1/wp-core");
    }
    stq_plugin_audit() {
        return this.makeRequest("wp-json/stq/v1/plugin-audit");
    }
    stq_akismet() {
        return this.makeRequest("wp-json/stq/v1/akismet");
    }
    stq_password_cycle() {
        return this.makeRequest("wp-json/stq/v1/strategiq-password-cycle");
    }
    stq_sucuri_audit() {
        return this.makeRequest("wp-json/stq/v1/sucuri-audit");
    }
    stq_sucuri_audit_logs() {
        return this.makeRequest("wp-json/stq/v1/sucuri-audit/logs");
    }

    // PageSpeed
    pagespeed() {
        return this.makeRequest("pagespeed");
    }
}

export default WPSite;
