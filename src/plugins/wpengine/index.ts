import type { Plugin } from "vue";

import BackupButton from "./components/BackupButton.vue";
import { useSharedStore } from "@/stores/shared";
const wpenginePlugin: Plugin = {
    install(app) {       
        app.component("BackupButton", BackupButton);

        const sharedStore = useSharedStore();

        // Remove d-none from the "Integrations" divider
        sharedStore.sidebars.contextual.settings.items.forEach((item) => {
            if (item.divider === "Integrations") {
                item.class = "";
            }
        });

        // Add WPEngine to the sidebar
        sharedStore.sidebars.contextual.settings.items.push({
            label: "WP Engine",
            name: "account-wp-engine",
        });
    }
};

export default wpenginePlugin;