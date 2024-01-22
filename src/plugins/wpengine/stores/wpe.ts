import WPSite from "@/classes/wp.class";
import router from "@/router";
import { defineStore } from "pinia";
import { reactive } from "vue";
import WPEngine from "../classes/wpe.class";

export const useWPEStore = defineStore("wpe", {
    state: () => reactive({
        engine: new WPEngine(),
    })
});
