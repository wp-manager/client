import { defineStore } from 'pinia'
import { reactive, ref, type Ref } from 'vue';
import type { Site } from './api';

type User = {
    id: string,
    username: string
};

export const useNewAuthStore = defineStore('newAuth', () => {
    // TODO: Implement JWT auth
    let user: Ref<User> = ref({} as User);
    let sites: Ref<Site[]> = ref([] as Site[]);
    let authCheck: (user: any) => void = () => {};

    if(import.meta.env.UI_API){
        getUserFromAPI();
    }

    async function getUserFromAPI(){
        const apiUser = await fetch(`https://${import.meta.env.UI_API}/auth/user`).then(res => res.json());
        if(!apiUser.id){
            authCheck(false);
            return;
        };
        user.value = apiUser;
        authCheck(user);
        getUserSites();
    }

    async function getUserSites(){
        sites.value = await fetch(`https://${import.meta.env.UI_API}/sites`).then(res => res.json());
    }

    function authCallback(callback: (user: any) => void){
        authCheck = callback;
    }

    return { user, authCallback, getUserSites, sites }
    
})
export type { User };
