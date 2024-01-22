import type { Plugin } from "vue";

import BackupButton from "./components/BackupButton.vue";
import { useSharedStore } from "@/stores/shared";
const wpenginePlugin: Plugin = {
    install(app) {       
        app.component("BackupButton", BackupButton);

        const sharedStore = useSharedStore();

        sharedStore.sidebars.contextual.main.items.filter((item) => {
            if (item.name === "Home"){
                item.icon = "bi-hammer";
            }
        });
    }
};

export default wpenginePlugin;