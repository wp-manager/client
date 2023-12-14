import { defineStore } from 'pinia'
import { ref } from 'vue';

type Site = {
    _id: string,
    uri: string
}

export const useApiStore = defineStore('api', () => {
    const apiBase = import.meta.env.UI_API;
    let user = ref({});

    let authCheck: (user: any) => void = () => {};

    getAuthdUser();

    async function getAuthdUser(){
        user.value = await fetch(`https://${apiBase}/auth/user`).then(res => res.json());
        authCheck(user.value);
    }

    async function getSites(): Promise<Site[]>{
        return fetch(`https://${apiBase}/sites`).then(res => res.json());
    }

    function onAuth(callback: (user: any) => void){
        authCheck = callback;
    }

    return { getSites, onAuth, user }
})

export type { Site };
