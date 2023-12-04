import { ref } from "vue";
import { defineStore } from "pinia";

import type { Site } from "@/types/site";

type Flash = {
    message: string;
    type: string;
    persist?: boolean;
};

export const useFlashStore = defineStore("flash", () => {
    let flashes = ref<Flash[]>([]);

    let sessionFlashes = sessionStorage.getItem("flashes");
    if (sessionFlashes) {
        flashes.value = JSON.parse(sessionFlashes) as Flash[];
    }

    function addFlash(flash: Flash) {
        flashes.value.push(flash);
        sessionStorage.setItem("flashes", JSON.stringify(flashes.value));
    }

    function getFlashes(clear: boolean = true) {
        if (clear) {
            sessionStorage.removeItem("flashes");
        }
        return flashes.value;
    }

    function clearFlashes() {
        sessionStorage.removeItem("flashes");
        flashes.value = [];
    }

    return { flashes, addFlash, getFlashes, clearFlashes };
});
