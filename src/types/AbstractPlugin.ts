import { usePluginsStore } from "@/stores/plugins";
import type { RouteRecordRaw } from "vue-router";


abstract class AbstractPlugin {
    enabled: boolean = false;
    // properties to define the name and version of the plugin
    abstract name: string;
    abstract description: string;
    abstract author: string;
    abstract version: string;

    routes(): RouteRecordRaw[] {
        return [];
    }

    test(){
        return true;
    }
}

export default AbstractPlugin;