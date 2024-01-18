import WPSite from "./wp.class";

class STQClass extends WPSite {
    
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
}

export default STQClass;
