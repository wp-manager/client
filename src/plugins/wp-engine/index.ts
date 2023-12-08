import SidebarVue from "@/components/layout/Sidebar.vue";
import router from "@/router";
import AbstractPlugin from "@/types/AbstractPlugin";
import PluginsVue from "@/views/Plugins.vue";


class DSAPPlugin extends AbstractPlugin {
    name: string = "WP Engine";
    description: string =
        "Adds WP Engine capabilities (e.g. backup, cache control) to your sites";
    author: string = "Darren Griffin";
    version: string = "0.0.1";

    constructor() {
        super();
    }

    test() {
        router.addRoute({
            path: "/wp-engine",
            name: "wp-engine",
            component: PluginsVue,
            children: [
                {
                    path: "",
                    name: "wp-engine-home",
                    component: SidebarVue,
                },
            ],
        });
        //router.replace("/wp-engine");
    }
}

export default DSAPPlugin;
