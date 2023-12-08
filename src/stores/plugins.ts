import { ref, computed, onMounted, watch } from 'vue'
import { defineStore } from 'pinia'
import type AbstractPlugin from '@/types/AbstractPlugin';
import router from '@/router';


export const usePluginsStore = defineStore('plugins', () => {
    const plugins = ref<AbstractPlugin[]>([]);    

    async function load(plugin: string): Promise<boolean> {
        let pluginInstance: AbstractPlugin;
        try{
            const module = await import(`@/plugins/${plugin}/index.ts`);
            const pluginClass = module.default;
            pluginInstance = new pluginClass();
            plugins.value.push(pluginInstance);
            pluginInstance.test();
        } catch (error: any) {
            throw new Error(error);
        }

        return true;
    }
    
    function enable(plugin: AbstractPlugin){
        plugin.enabled = true;
        updatePluginStorage();
    }

    function disable(plugin: AbstractPlugin){
        plugin.enabled = false;
        updatePluginStorage();
    }

    function toggle(plugin: AbstractPlugin){
        plugin.enabled = !plugin.enabled;
        updatePluginStorage();
    }    

    function updatePluginStorage(){
        let enabled: string[] = [];
        plugins.value.forEach((plugin: AbstractPlugin) => {
            if(plugin.enabled){
                enabled.push(plugin.name);
            }
        });

        localStorage.setItem('plugins', JSON.stringify(enabled));
    }
    
    function list(enabledOnly: boolean = false): AbstractPlugin[] {
        if(enabledOnly){
            return plugins.value.filter((plugin: AbstractPlugin) => plugin.enabled);
        }

        return plugins.value;   
    }

    return { plugins, load, enable, list, disable, toggle }
})
